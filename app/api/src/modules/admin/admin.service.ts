//apps/api/src/modules/admin/admin.service.ts ===
import { Injectable } from '@nestjs/common'
import { BookingStatus, RoomStatus } from '../../common/enums'
import { PrismaService } from '../../database/prisma.service'
import { startOfMonth, endOfMonth } from 'date-fns'

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Bookings ───────────────────────────────────────────────────────────────

  async listBookings({
    page, limit, status,
  }: { page: number; limit: number; status?: string }) {
    const skip  = (page - 1) * limit
    const where = status ? { status: status as any } : {}

    const [data, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take:    limit,
        include: {
          user: { select: { id: true, email: true, firstName: true, lastName: true } },
          room: { include: { roomType: true } },
          payments: { select: { status: true, provider: true, amount: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ])

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async bookingStats() {
    const now        = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd   = endOfMonth(now)

    const [monthBookings, occupiedTonight, monthRevenue, totalRooms] =
      await Promise.all([
        this.prisma.booking.count({
          where: {
            createdAt: { gte: monthStart, lte: monthEnd },
            status:    { not: BookingStatus.CANCELLED as any },
          },
        }),
        this.prisma.booking.count({
          where: {
            status:   BookingStatus.CONFIRMED as any,
            checkIn:  { lte: now },
            checkOut: { gte: now },
          },
        }),
        this.prisma.payment.aggregate({
          _sum:  { amount: true },
          where: { status: 'SUCCESS', currency: 'KES', paidAt: { gte: monthStart, lte: monthEnd } },
        }),
        this.prisma.room.count({ where: { status: RoomStatus.available as any } }),
      ])

    return {
      monthBookings,
      occupiedTonight,
      monthRevenueKes: Number(monthRevenue._sum.amount ?? 0),
      occupancyRate:   totalRooms > 0
        ? Math.round((occupiedTonight / totalRooms) * 100)
        : 0,
    }
  }

  async getBooking(id: string) {
    return this.prisma.booking.findUniqueOrThrow({
      where:   { id },
      include: {
        user:     true,
        room:     { include: { roomType: true } },
        payments: true,
        review:   true,
      },
    })
  }

  async updateBookingStatus(id: string, status: string) {
    return this.prisma.booking.update({
      where: { id },
      data:  {
        status: status as any,
        ...(status === BookingStatus.CONFIRMED ? { confirmedAt: new Date() } : {}),
      },
    })
  }

  // ── Rooms ──────────────────────────────────────────────────────────────────

  async listRooms() {
    return this.prisma.room.findMany({
      include: {
        roomType: true,
        availabilityBlocks: {
          where:   { endDate: { gte: new Date() } },
          orderBy: { startDate: 'asc' },
          take:    3,
        },
      },
      orderBy: { roomNumber: 'asc' },
    })
  }

  async updateRoomStatus(id: string, status: string, notes?: string) {
    return this.prisma.room.update({
      where: { id },
      data:  { status: status as any, ...(notes !== undefined ? { notes } : {}) },
    })
  }

  // ── Guests ─────────────────────────────────────────────────────────────────

  async listGuests({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where:   { role: 'guest' as any },
        skip,
        take:    limit,
        select: {
          id: true, email: true, firstName: true, lastName: true,
          phone: true, nationality: true, createdAt: true,
          _count: { select: { bookings: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: { role: 'guest' as any } }),
    ])
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  // ── Revenue report ─────────────────────────────────────────────────────────

  async revenueReport(year: number) {
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(year, i, 1)
      return { start: startOfMonth(d), end: endOfMonth(d), month: i + 1 }
    })

    const results = await Promise.all(
      months.map(async ({ start, end, month }) => {
        const agg = await this.prisma.payment.aggregate({
          _sum:   { amount: true },
          _count: { id: true },
          where:  { status: 'SUCCESS', currency: 'KES', paidAt: { gte: start, lte: end } },
        })
        return { month, year, revenueKes: Number(agg._sum.amount ?? 0), payments: agg._count.id }
      }),
    )

    return { year, totalKes: results.reduce((s, r) => s + r.revenueKes, 0), byMonth: results }
  }

  // ── Seasonal pricing ────────────────────────────────────────────────────────

  async listSeasonalPricing() {
    return this.prisma.seasonalPricing.findMany({
      include: { roomType: true },
      orderBy: { startDate: 'asc' },
    })
  }

  async createSeasonalPricing(data: {
    roomTypeSlug: string
    startDate:    string
    endDate:      string
    multiplier:   number
    label?:       string
  }) {
    const roomType = await this.prisma.roomType.findUniqueOrThrow({
      where: { slug: data.roomTypeSlug },
    })
    return this.prisma.seasonalPricing.create({
      data: {
        roomTypeId: roomType.id,
        startDate:  new Date(data.startDate),
        endDate:    new Date(data.endDate),
        multiplier: data.multiplier,
        label:      data.label,
      },
      include: { roomType: true },
    })
  }

  async deleteSeasonalPricing(id: string) {
    return this.prisma.seasonalPricing.delete({ where: { id } })
  }
}