"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const prisma_service_1 = require("../../database/prisma.service");
const date_fns_1 = require("date-fns");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const now = new Date();
        const monthStart = (0, date_fns_1.startOfMonth)(now);
        const monthEnd = (0, date_fns_1.endOfMonth)(now);
        const [monthBookings, occupiedTonight, monthRevenue, totalRooms] = await Promise.all([
            this.prisma.booking.count({
                where: {
                    createdAt: { gte: monthStart, lte: monthEnd },
                    status: { not: enums_1.BookingStatus.CANCELLED },
                },
            }),
            this.prisma.booking.count({
                where: {
                    status: enums_1.BookingStatus.CONFIRMED,
                    checkIn: { lte: now },
                    checkOut: { gte: now },
                },
            }),
            this.prisma.payment.aggregate({
                _sum: { amount: true },
                where: { status: 'SUCCESS', currency: 'KES', paidAt: { gte: monthStart, lte: monthEnd } },
            }),
            this.prisma.room.count({ where: { status: 'available' } }),
        ]);
        return {
            monthBookings,
            occupiedTonight,
            monthRevenueKes: Number(monthRevenue._sum.amount ?? 0),
            occupancyRate: totalRooms > 0
                ? Math.round((occupiedTonight / totalRooms) * 100)
                : 0,
        };
    }
    async getOccupancyTrend(days = 30) {
        const now = new Date();
        const rangeStart = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(now, days - 1));
        const [blocks, totalRooms] = await Promise.all([
            this.prisma.availabilityBlock.findMany({
                where: {
                    reason: 'booked',
                    startDate: { lte: now },
                    endDate: { gte: rangeStart },
                },
                select: { startDate: true, endDate: true },
            }),
            this.prisma.room.count({ where: { status: 'available' } }),
        ]);
        const result = [];
        for (let i = days - 1; i >= 0; i--) {
            const dateOnly = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(now, i));
            const occupied = blocks.filter((b) => b.startDate <= dateOnly && b.endDate >= dateOnly).length;
            result.push({
                date: (0, date_fns_1.format)(dateOnly, 'yyyy-MM-dd'),
                occupied,
                available: Math.max(0, totalRooms - occupied),
            });
        }
        return result;
    }
    async getRevenueByMonth(year = new Date().getFullYear()) {
        const months = Array.from({ length: 12 }, (_, i) => {
            const d = new Date(year, i, 1);
            return { start: (0, date_fns_1.startOfMonth)(d), end: (0, date_fns_1.endOfMonth)(d), month: i + 1 };
        });
        const results = await Promise.all(months.map(async ({ start, end, month }) => {
            const agg = await this.prisma.payment.aggregate({
                _sum: { amount: true },
                _count: { id: true },
                where: { status: 'SUCCESS', currency: 'KES', paidAt: { gte: start, lte: end } },
            });
            return { month, year, revenueKes: Number(agg._sum.amount ?? 0), payments: agg._count.id };
        }));
        return { year, totalKes: results.reduce((s, r) => s + r.revenueKes, 0), byMonth: results };
    }
    async getTopRoomTypes() {
        const grouped = await this.prisma.booking.groupBy({
            by: ['roomId'],
            _count: { id: true },
            _sum: { totalKes: true },
            where: { status: { not: enums_1.BookingStatus.CANCELLED } },
            orderBy: { _count: { id: 'desc' } },
            take: 5,
        });
        if (grouped.length === 0)
            return [];
        const rooms = await this.prisma.room.findMany({
            where: { id: { in: grouped.map((g) => g.roomId) } },
            include: { roomType: true },
        });
        const roomMap = new Map(rooms.map((r) => [r.id, r]));
        return grouped.map((b) => {
            const room = roomMap.get(b.roomId);
            return {
                roomType: room?.roomType.nameEn ?? 'Unknown',
                bookings: b._count.id,
                revenueKes: Number(b._sum.totalKes ?? 0),
            };
        });
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map