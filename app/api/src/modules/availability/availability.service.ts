// apps/api/src/modules/availability/availability.service.ts ===
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService }   from '../../database/prisma.service'
import { DateRangeService } from '../../domain/availability/date-range.service'
import { PricingService }   from '../../domain/pricing/pricing.service'

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async check(
    roomTypeSlug: string,
    checkIn:      string,
    checkOut:     string,
    guests:       number,
  ) {
    const roomType = await this.prisma.roomType.findUnique({ where: { slug: roomTypeSlug } })
    if (!roomType) throw new NotFoundException(`Room type '${roomTypeSlug}' not found`)

    const room    = await this.findAvailableRoom(roomTypeSlug, checkIn, checkOut, guests)
    const nights  = DateRangeService.nights(checkIn, checkOut)

    const seasonal = await this.prisma.seasonalPricing.findFirst({
      where: {
        roomTypeId: roomType.id,
        startDate:  { lte: new Date(checkIn) },
        endDate:    { gte: new Date(checkOut) },
      },
    })

    const pricing = PricingService.calculateTotal({
      basePriceKes: Number(roomType.basePriceKes),
      basePriceUsd: Number(roomType.basePriceUsd),
      nights,
      multiplier:   seasonal ? Number(seasonal.multiplier) : 1,
    })

    return {
      available:        !!room,
      roomTypeSlug,
      pricePerNightKes: pricing.perNightKes,
      pricePerNightUsd: pricing.perNightUsd,
      totalNights:      nights,
      subtotalKes:      pricing.subtotalKes,
      subtotalUsd:      pricing.subtotalUsd,
      vatKes:           pricing.vatKes,
      vatUsd:           pricing.vatUsd,
      totalKes:         pricing.totalKes,
      totalUsd:         pricing.totalUsd,
    }
  }

  async findAvailableRoom(
    roomTypeSlug: string,
    checkIn:      string,
    checkOut:     string,
    guests:       number,
  ) {
    const roomType = await this.prisma.roomType.findUnique({ where: { slug: roomTypeSlug } })
    if (!roomType || guests > roomType.maxOccupancy) return null

    const blocked = await this.prisma.availabilityBlock.findMany({
      where: {
        room:      { roomTypeId: roomType.id },
        startDate: { lt: new Date(checkOut) },
        endDate:   { gt: new Date(checkIn) },
      },
      select: { roomId: true },
    })

    return this.prisma.room.findFirst({
      where: {
        roomTypeId: roomType.id,
        status:     'available',
        id:         { notIn: blocked.map((b: any) => b.roomId) },
      },
      include: { roomType: true },
    })
  }

  async getBlockedDates(roomTypeSlug: string): Promise<{ start: string; end: string }[]> {
    const roomType = await this.prisma.roomType.findUnique({
      where:   { slug: roomTypeSlug },
      include: { rooms: { select: { id: true } } },
    })
    if (!roomType || !roomType.rooms.length) return []

    const blocks = await this.prisma.availabilityBlock.findMany({
      where: {
        roomId:  { in: roomType.rooms.map((r: any) => r.id) },
        endDate: { gte: new Date() },
      },
      select: { startDate: true, endDate: true },
    })

    return blocks.map((b: any) => ({
      start: DateRangeService.toDateString(b.startDate),
      end:   DateRangeService.toDateString(b.endDate),
    }))
  }
}