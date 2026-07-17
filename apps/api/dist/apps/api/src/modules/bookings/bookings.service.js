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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const availability_service_1 = require("../availability/availability.service");
const notifications_service_1 = require("../notifications/notifications.service");
const pricing_service_1 = require("../../domain/pricing/pricing.service");
const date_range_service_1 = require("../../domain/availability/date-range.service");
const booking_reference_service_1 = require("../../domain/booking/booking-reference.service");
const cancellation_policy_service_1 = require("../../domain/booking/cancellation-policy.service");
const enums_1 = require("../../common/enums");
let BookingsService = class BookingsService {
    constructor(prisma, availability, notifications) {
        this.prisma = prisma;
        this.availability = availability;
        this.notifications = notifications;
    }
    async create(dto, user) {
        if (!date_range_service_1.DateRangeService.isValidRange(dto.checkIn, dto.checkOut)) {
            throw new common_1.ConflictException('Check-out must be after check-in');
        }
        const nights = date_range_service_1.DateRangeService.nights(dto.checkIn, dto.checkOut);
        const room = await this.availability.findAvailableRoom(dto.roomTypeSlug, dto.checkIn, dto.checkOut, dto.adults + (dto.children ?? 0));
        if (!room) {
            throw new common_1.ConflictException('No rooms available for the selected dates and room type');
        }
        const seasonal = await this.prisma.seasonalPricing.findFirst({
            where: {
                roomTypeId: room.roomTypeId,
                startDate: { lte: new Date(dto.checkIn) },
                endDate: { gte: new Date(dto.checkOut) },
            },
        });
        const pricing = pricing_service_1.PricingService.calculateTotal({
            basePriceKes: Number(room.roomType.basePriceKes),
            basePriceUsd: Number(room.roomType.basePriceUsd),
            nights,
            multiplier: seasonal ? Number(seasonal.multiplier) : 1,
        });
        const booking = await this.prisma.$transaction(async (tx) => {
            const b = await tx.booking.create({
                data: {
                    reference: booking_reference_service_1.BookingReferenceService.generate(),
                    userId: user.id,
                    roomId: room.id,
                    checkIn: new Date(dto.checkIn),
                    checkOut: new Date(dto.checkOut),
                    nights,
                    adults: dto.adults,
                    children: dto.children ?? 0,
                    status: enums_1.BookingStatus.PENDING,
                    totalKes: pricing.subtotalKes,
                    totalUsd: pricing.subtotalUsd,
                    specialRequests: dto.specialRequests,
                    source: 'website',
                },
                include: {
                    room: { include: { roomType: true } },
                    user: true,
                },
            });
            await tx.availabilityBlock.create({
                data: {
                    roomId: room.id,
                    startDate: new Date(dto.checkIn),
                    endDate: new Date(dto.checkOut),
                    reason: 'booked',
                    bookingId: b.id,
                },
            });
            return b;
        });
        this.dispatchNotifications(booking).catch(() => { });
        return { ...booking, pricing };
    }
    async findByUser(userId) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                room: {
                    include: {
                        roomType: { include: { images: { where: { isHero: true }, take: 1 } } },
                    },
                },
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId, isAdmin = false) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                room: { include: { roomType: { include: { images: true } } } },
                payments: true,
                user: { select: { id: true, email: true, firstName: true, lastName: true, phone: true } },
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (!isAdmin && booking.userId !== userId)
            throw new common_1.ForbiddenException();
        return booking;
    }
    async findByReference(ref, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { reference: ref },
            include: {
                room: { include: { roomType: { include: { images: { where: { isHero: true } } } } } },
                payments: true,
                user: { select: { id: true, email: true, firstName: true, lastName: true, phone: true } },
            },
        });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        if (booking.userId !== userId)
            throw new common_1.ForbiddenException();
        return booking;
    }
    async cancel(id, userId) {
        const booking = await this.findOne(id, userId);
        if (booking.status === enums_1.BookingStatus.CANCELLED) {
            throw new common_1.ConflictException('Booking is already cancelled');
        }
        const policy = cancellation_policy_service_1.CancellationPolicyService.canCancel(new Date(booking.checkIn));
        if (!policy.canCancel)
            throw new common_1.ConflictException(policy.reason);
        const cancelled = await this.prisma.$transaction(async (tx) => {
            const updated = await tx.booking.update({
                where: { id },
                data: { status: enums_1.BookingStatus.CANCELLED },
                include: {
                    room: { include: { roomType: true } },
                    user: true,
                },
            });
            await tx.availabilityBlock.deleteMany({ where: { bookingId: id } });
            return updated;
        });
        this.notifications.sendCancellationNotice(cancelled).catch(() => { });
        return cancelled;
    }
    async dispatchNotifications(booking) {
        await Promise.allSettled([
            this.notifications.sendBookingConfirmation(booking),
            this.notifications.sendWhatsApp(booking),
        ]);
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        availability_service_1.AvailabilityService,
        notifications_service_1.NotificationsService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map