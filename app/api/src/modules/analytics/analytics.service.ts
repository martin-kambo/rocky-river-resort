// apps/api/src/modules/analytics/analytics.service.ts ===
import { Injectable } from '@nestjs/common'
import { BookingStatus } from '../../common/enums'
import { PrismaService } from '../../database/prisma.service'
import { startOfMonth, endOfMonth, startOfDay, subDays, format } from 'date-fns'

/**
 * AnalyticsService — on-demand metrics for the admin dashboard.
 *
 * Phase 1: all queries run on request.
 * N+1 fixes applied:
 *   - getOccupancyTrend: 2 queries total (not 2×days)
 *   - getTopRoomTypes:   2 queries total (not 1+N)
 */
@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
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
        this.prisma.room.count({ where: { status: 'available' } }),
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

  /**
   * FIXED N+1: was 2 queries × days (60 for 30-day window).
   * Now: 1 query for all blocks in range + 1 query for room count.
   * Day-by-day filtering done in memory.
   */
  async getOccupancyTrend(days = 30) {
    const now        = new Date()
    const rangeStart = startOfDay(subDays(now, days - 1))

    const [blocks, totalRooms] = await Promise.all([
      this.prisma.availabilityBlock.findMany({
        where: {
          reason:    'booked' as any,
          startDate: { lte: now },
          endDate:   { gte: rangeStart },
        },
        select: { startDate: true, endDate: true },
      }),
      this.prisma.room.count({ where: { status: 'available' } }),
    ])

    const result: { date: string; occupied: number; available: number }[] = []
    for (let i = days - 1; i >= 0; i--) {
      const dateOnly = startOfDay(subDays(now, i))
      const occupied = blocks.filter(
        (b: any) => b.startDate <= dateOnly && b.endDate >= dateOnly,
      ).length

      result.push({
        date:      format(dateOnly, 'yyyy-MM-dd'),
        occupied,
        available: Math.max(0, totalRooms - occupied),
      })
    }
    return result
  }

  async getRevenueByMonth(year = new Date().getFullYear()) {
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

  /**
   * FIXED N+1: was groupBy + N individual findUnique calls.
   * Now: groupBy + 1 findMany, joined in memory.
   */
  async getTopRoomTypes() {
    const grouped = await this.prisma.booking.groupBy({
      by:      ['roomId'],
      _count:  { id: true },
      _sum:    { totalKes: true },
      where:   { status: { not: BookingStatus.CANCELLED as any } },
      orderBy: { _count: { id: 'desc' } },
      take:    5,
    })

    if (grouped.length === 0) return []

    const rooms = await this.prisma.room.findMany({
      where:   { id: { in: grouped.map((g: any) => g.roomId as string) } },
      include: { roomType: true },
    })
    const roomMap = new Map(rooms.map((r: any) => [r.id, r]))

    return grouped.map((b: any) => {
      const room = roomMap.get(b.roomId) as any
      return {
        roomType:   room?.roomType.nameEn ?? 'Unknown',
        bookings:   b._count.id,
        revenueKes: Number(b._sum.totalKes ?? 0),
      }
    })
  }
}
