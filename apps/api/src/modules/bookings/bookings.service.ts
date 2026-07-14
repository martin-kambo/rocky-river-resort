// apps/api/src/modules/bookings/bookings.service.ts ===
import {
  Injectable, ConflictException, ForbiddenException, NotFoundException,
} from '@nestjs/common'
import { PrismaService }           from '../../database/prisma.service'
import { AvailabilityService }     from '../availability/availability.service'
import { NotificationsService }    from '../notifications/notifications.service'
import { PricingService }          from '../../domain/pricing/pricing.service'
import { DateRangeService }        from '../../domain/availability/date-range.service'
import { BookingReferenceService } from '../../domain/booking/booking-reference.service'
import { CancellationPolicyService } from '../../domain/booking/cancellation-policy.service'
import { CreateBookingDto }        from './dto/create-booking.dto'
import { BookingStatus }           from '../../common/enums'

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma:        PrismaService,
    private readonly availability:  AvailabilityService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(dto: CreateBookingDto, user: any) {
    if (!DateRangeService.isValidRange(dto.checkIn, dto.checkOut)) {
      throw new ConflictException('Check-out must be after check-in')
    }

    const nights = DateRangeService.nights(dto.checkIn, dto.checkOut)

    const room = await this.availability.findAvailableRoom(
      dto.roomTypeSlug,
      dto.checkIn,
      dto.checkOut,
      dto.adults + (dto.children ?? 0),
    )
    if (!room) {
      throw new ConflictException('No rooms available for the selected dates and room type')
    }

    const seasonal = await this.prisma.seasonalPricing.findFirst({
      where: {
        roomTypeId: room.roomTypeId,
        startDate:  { lte: new Date(dto.checkIn) },
        endDate:    { gte: new Date(dto.checkOut) },
      },
    })

    const pricing = PricingService.calculateTotal({
      basePriceKes: Number(room.roomType.basePriceKes),
      basePriceUsd: Number(room.roomType.basePriceUsd),
      nights,
      multiplier:   seasonal ? Number(seasonal.multiplier) : 1,
    })

    const booking = await this.prisma.$transaction(async (tx: any) => {
      const b = await tx.booking.create({
        data: {
          reference:       BookingReferenceService.generate(),
          userId:          user.id,
          roomId:          room.id,
          checkIn:         new Date(dto.checkIn),
          checkOut:        new Date(dto.checkOut),
          nights,
          adults:          dto.adults,
          children:        dto.children ?? 0,
          status:          BookingStatus.PENDING,
          totalKes:        pricing.subtotalKes,
          totalUsd:        pricing.subtotalUsd,
          specialRequests: dto.specialRequests,
          source:          'website',
        },
        include: {
          room: { include: { roomType: true } },
          user: true,
        },
      })

      await tx.availabilityBlock.create({
        data: {
          roomId:    room.id,
          startDate: new Date(dto.checkIn),
          endDate:   new Date(dto.checkOut),
          reason:    'booked',
          bookingId: b.id,
        },
      })

      return b
    })

    // Fire-and-forget notifications — never blocks the API response
    this.dispatchNotifications(booking).catch(() => {})

    return { ...booking, pricing }
  }

  async findByUser(userId: string) {
    return this.prisma.booking.findMany({
      where:   { userId },
      include: {
        room: {
          include: {
            roomType: { include: { images: { where: { isHero: true }, take: 1 } } },
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findOne(id: string, userId: string, isAdmin = false) {
    const booking = await this.prisma.booking.findUnique({
      where:   { id },
      include: {
        room:     { include: { roomType: { include: { images: true } } } },
        payments: true,
        user:     { select: { id: true, email: true, firstName: true, lastName: true, phone: true } },
      },
    })
    if (!booking) throw new NotFoundException('Booking not found')
    if (!isAdmin && booking.userId !== userId) throw new ForbiddenException()
    return booking
  }

  async findByReference(ref: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where:   { reference: ref },
      include: {
        room:     { include: { roomType: { include: { images: { where: { isHero: true } } } } } },
        payments: true,
        user:     { select: { id: true, email: true, firstName: true, lastName: true, phone: true } },
      },
    })
    if (!booking) throw new NotFoundException('Booking not found')
    if (booking.userId !== userId) throw new ForbiddenException()
    return booking
  }

  async cancel(id: string, userId: string): Promise<any> {
    const booking = await this.findOne(id, userId)

    if (booking.status === BookingStatus.CANCELLED) {
      throw new ConflictException('Booking is already cancelled')
    }

    const policy = CancellationPolicyService.canCancel(new Date(booking.checkIn))
    if (!policy.canCancel) throw new ConflictException(policy.reason)

    const cancelled = await this.prisma.$transaction(async (tx: any) => {
      const updated = await tx.booking.update({
        where: { id },
        data:  { status: BookingStatus.CANCELLED },
        include: {
          room: { include: { roomType: true } },
          user: true,
        },
      })
      await tx.availabilityBlock.deleteMany({ where: { bookingId: id } })
      return updated
    })

    this.notifications.sendCancellationNotice(cancelled).catch(() => {})
    return cancelled
  }

  private async dispatchNotifications(booking: any): Promise<void> {
    await Promise.allSettled([
      this.notifications.sendBookingConfirmation(booking),
      this.notifications.sendWhatsApp(booking),
    ])
  }
}