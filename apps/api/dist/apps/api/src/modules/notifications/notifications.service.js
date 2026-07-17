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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_provider_interface_1 = require("../../infrastructure/email/email-provider.interface");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(email, config) {
        this.email = email;
        this.config = config;
        this.logger = new common_1.Logger(NotificationsService_1.name);
    }
    async sendBookingConfirmation(booking) {
        const data = this.toEmailData(booking);
        await this.email.sendBookingConfirmation(data);
        this.logger.log(`Confirmation sent → ${booking.user.email} [${booking.reference}]`);
    }
    async sendCancellationNotice(booking) {
        const data = this.toEmailData(booking);
        await this.email.sendCancellationNotice(data);
        this.logger.log(`Cancellation notice sent → ${booking.user.email} [${booking.reference}]`);
    }
    async sendWelcome(email, firstName) {
        await this.email.sendWelcome({ email, firstName });
        this.logger.log(`Welcome email sent → ${email}`);
    }
    async sendPasswordReset(email, name, resetUrl) {
        await this.email.sendPasswordReset({ email, name, resetUrl });
        this.logger.log(`Password reset sent → ${email}`);
    }
    async sendWhatsApp(booking) {
        const phone = booking.user.phone;
        if (!phone) {
            this.logger.warn(`No phone for WhatsApp notification [${booking.reference}]`);
            return;
        }
        this.logger.log(`[Phase 2] WhatsApp queued → ${phone} [${booking.reference}]`);
    }
    toEmailData(booking) {
        return {
            reference: booking.reference,
            guestName: `${booking.user.firstName} ${booking.user.lastName}`,
            guestEmail: booking.user.email,
            roomName: booking.room.roomType.nameEn,
            checkIn: new Date(booking.checkIn),
            checkOut: new Date(booking.checkOut),
            nights: booking.nights,
            adults: booking.adults,
            totalKes: Number(booking.totalKes),
            phone: booking.user.phone,
        };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_provider_interface_1.EMAIL_PROVIDER)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map