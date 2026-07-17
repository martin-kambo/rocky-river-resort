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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const prisma_service_1 = require("../../database/prisma.service");
const date_fns_1 = require("date-fns");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listBookings({ page, limit, status, }) {
        const skip = (page - 1) * limit;
        const where = status ? { status: status } : {};
        const [data, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: { select: { id: true, email: true, firstName: true, lastName: true } },
                    room: { include: { roomType: true } },
                    payments: { select: { status: true, provider: true, amount: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.booking.count({ where }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async bookingStats() {
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
            this.prisma.room.count({ where: { status: enums_1.RoomStatus.available } }),
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
    async getBooking(id) {
        return this.prisma.booking.findUniqueOrThrow({
            where: { id },
            include: {
                user: true,
                room: { include: { roomType: true } },
                payments: true,
                review: true,
            },
        });
    }
    async updateBookingStatus(id, status) {
        return this.prisma.booking.update({
            where: { id },
            data: {
                status: status,
                ...(status === enums_1.BookingStatus.CONFIRMED ? { confirmedAt: new Date() } : {}),
            },
        });
    }
    async listRooms() {
        return this.prisma.room.findMany({
            include: {
                roomType: true,
                availabilityBlocks: {
                    where: { endDate: { gte: new Date() } },
                    orderBy: { startDate: 'asc' },
                    take: 3,
                },
            },
            orderBy: { roomNumber: 'asc' },
        });
    }
    async updateRoomStatus(id, status, notes) {
        return this.prisma.room.update({
            where: { id },
            data: { status: status, ...(notes !== undefined ? { notes } : {}) },
        });
    }
    async listGuests({ page, limit }) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where: { role: 'guest' },
                skip,
                take: limit,
                select: {
                    id: true, email: true, firstName: true, lastName: true,
                    phone: true, nationality: true, createdAt: true,
                    _count: { select: { bookings: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({ where: { role: 'guest' } }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async revenueReport(year) {
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
    async listSeasonalPricing() {
        return this.prisma.seasonalPricing.findMany({
            include: { roomType: true },
            orderBy: { startDate: 'asc' },
        });
    }
    async createSeasonalPricing(data) {
        const roomType = await this.prisma.roomType.findUniqueOrThrow({
            where: { slug: data.roomTypeSlug },
        });
        return this.prisma.seasonalPricing.create({
            data: {
                roomTypeId: roomType.id,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                multiplier: data.multiplier,
                label: data.label,
            },
            include: { roomType: true },
        });
    }
    async deleteSeasonalPricing(id) {
        return this.prisma.seasonalPricing.delete({ where: { id } });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map