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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const date_range_service_1 = require("../../domain/availability/date-range.service");
const pricing_service_1 = require("../../domain/pricing/pricing.service");
let AvailabilityService = class AvailabilityService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async check(roomTypeSlug, checkIn, checkOut, guests) {
        const roomType = await this.prisma.roomType.findUnique({ where: { slug: roomTypeSlug } });
        if (!roomType)
            throw new common_1.NotFoundException(`Room type '${roomTypeSlug}' not found`);
        const room = await this.findAvailableRoom(roomTypeSlug, checkIn, checkOut, guests);
        const nights = date_range_service_1.DateRangeService.nights(checkIn, checkOut);
        const seasonal = await this.prisma.seasonalPricing.findFirst({
            where: {
                roomTypeId: roomType.id,
                startDate: { lte: new Date(checkIn) },
                endDate: { gte: new Date(checkOut) },
            },
        });
        const pricing = pricing_service_1.PricingService.calculateTotal({
            basePriceKes: Number(roomType.basePriceKes),
            basePriceUsd: Number(roomType.basePriceUsd),
            nights,
            multiplier: seasonal ? Number(seasonal.multiplier) : 1,
        });
        return {
            available: !!room,
            roomTypeSlug,
            pricePerNightKes: pricing.perNightKes,
            pricePerNightUsd: pricing.perNightUsd,
            totalNights: nights,
            subtotalKes: pricing.subtotalKes,
            subtotalUsd: pricing.subtotalUsd,
            vatKes: pricing.vatKes,
            vatUsd: pricing.vatUsd,
            totalKes: pricing.totalKes,
            totalUsd: pricing.totalUsd,
        };
    }
    async findAvailableRoom(roomTypeSlug, checkIn, checkOut, guests) {
        const roomType = await this.prisma.roomType.findUnique({ where: { slug: roomTypeSlug } });
        if (!roomType || guests > roomType.maxOccupancy)
            return null;
        const blocked = await this.prisma.availabilityBlock.findMany({
            where: {
                room: { roomTypeId: roomType.id },
                startDate: { lt: new Date(checkOut) },
                endDate: { gt: new Date(checkIn) },
            },
            select: { roomId: true },
        });
        return this.prisma.room.findFirst({
            where: {
                roomTypeId: roomType.id,
                status: 'available',
                id: { notIn: blocked.map((b) => b.roomId) },
            },
            include: { roomType: true },
        });
    }
    async getBlockedDates(roomTypeSlug) {
        const roomType = await this.prisma.roomType.findUnique({
            where: { slug: roomTypeSlug },
            include: { rooms: { select: { id: true } } },
        });
        if (!roomType || !roomType.rooms.length)
            return [];
        const blocks = await this.prisma.availabilityBlock.findMany({
            where: {
                roomId: { in: roomType.rooms.map((r) => r.id) },
                endDate: { gte: new Date() },
            },
            select: { startDate: true, endDate: true },
        });
        return blocks.map((b) => ({
            start: date_range_service_1.DateRangeService.toDateString(b.startDate),
            end: date_range_service_1.DateRangeService.toDateString(b.endDate),
        }));
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map