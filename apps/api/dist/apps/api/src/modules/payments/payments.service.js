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
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const payment_provider_interface_1 = require("../../infrastructure/payments/payment-provider.interface");
const enums_1 = require("../../common/enums");
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(prisma, stripe, mpesa) {
        this.prisma = prisma;
        this.stripe = stripe;
        this.mpesa = mpesa;
        this.logger = new common_1.Logger(PaymentsService_1.name);
    }
    async initiateStripe(bookingId, currency) {
        const booking = await this.prisma.booking.findUniqueOrThrow({ where: { id: bookingId } });
        const raw = currency === 'KES' ? Number(booking.totalKes) : Number(booking.totalUsd);
        const amount = Math.round(raw * 100);
        const intent = await this.stripe.createPaymentIntent({
            amount,
            currency: currency.toLowerCase(),
            metadata: { bookingId, reference: booking.reference },
        });
        await this.prisma.payment.create({
            data: {
                bookingId,
                provider: 'STRIPE',
                providerRef: intent.id,
                amount: raw,
                currency,
                status: 'PENDING',
            },
        });
        return { clientSecret: intent.clientSecret };
    }
    async initiateMpesa(bookingId, phone) {
        const booking = await this.prisma.booking.findUniqueOrThrow({ where: { id: bookingId } });
        const amount = Math.ceil(Number(booking.totalKes));
        const result = await this.mpesa.initiateStk({
            phone,
            amount,
            accountRef: booking.reference,
            description: `Rocky River Resort – ${booking.reference}`,
        });
        await this.prisma.payment.create({
            data: {
                bookingId,
                provider: 'MPESA',
                providerRef: result.checkoutRequestId,
                amount,
                currency: 'KES',
                status: 'PENDING',
                payload: result.raw,
            },
        });
        return { checkoutRequestId: result.checkoutRequestId, message: result.customerMessage };
    }
    async handleStripeWebhook(rawBody, signature) {
        let event;
        try {
            event = this.stripe.constructWebhookEvent(rawBody, signature);
        }
        catch {
            throw new common_1.BadRequestException('Invalid Stripe webhook signature');
        }
        if (event.type === 'payment_intent.succeeded') {
            await this.confirmPayment(event.data.object.id, event.data.object);
        }
        else if (event.type === 'payment_intent.payment_failed') {
            await this.prisma.payment.updateMany({
                where: { providerRef: event.data.object.id },
                data: { status: enums_1.PaymentStatus.FAILED },
            });
        }
        return { received: true };
    }
    async handleMpesaCallback(body) {
        const cb = body?.Body?.stkCallback;
        if (!cb)
            return { received: true };
        const ref = cb.CheckoutRequestID;
        const success = cb.ResultCode === 0;
        await this.prisma.payment.updateMany({
            where: { providerRef: ref },
            data: {
                status: (success ? enums_1.PaymentStatus.SUCCESS : enums_1.PaymentStatus.FAILED),
                paidAt: success ? new Date() : undefined,
                payload: body,
            },
        });
        if (success) {
            const payment = await this.prisma.payment.findFirst({ where: { providerRef: ref } });
            if (payment) {
                await this.prisma.booking.update({
                    where: { id: payment.bookingId },
                    data: { status: enums_1.BookingStatus.CONFIRMED, confirmedAt: new Date() },
                });
                this.logger.log(`M-Pesa payment confirmed: ${ref}`);
            }
        }
        return { received: true };
    }
    async confirmPayment(providerRef, payload) {
        await this.prisma.$transaction(async (tx) => {
            await tx.payment.updateMany({
                where: { providerRef },
                data: { status: enums_1.PaymentStatus.SUCCESS, paidAt: new Date(), payload: payload },
            });
            const payment = await tx.payment.findFirst({ where: { providerRef } });
            if (payment) {
                await tx.booking.update({
                    where: { id: payment.bookingId },
                    data: { status: enums_1.BookingStatus.CONFIRMED, confirmedAt: new Date() },
                });
                this.logger.log(`Stripe payment confirmed: ${providerRef}`);
            }
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(payment_provider_interface_1.STRIPE_PROVIDER)),
    __param(2, (0, common_1.Inject)(payment_provider_interface_1.MPESA_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object, Object])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map