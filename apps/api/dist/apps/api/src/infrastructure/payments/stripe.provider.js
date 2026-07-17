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
var StripeProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let StripeProvider = StripeProvider_1 = class StripeProvider {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(StripeProvider_1.name);
        const key = config.get('payment.stripe.secretKey');
        if (!key) {
            this.logger.warn('STRIPE_SECRET_KEY not set — Stripe payments will fail');
        }
        this.stripe = new stripe_1.default(key ?? '', { apiVersion: '2024-04-10' });
    }
    async createPaymentIntent(params) {
        const intent = await this.stripe.paymentIntents.create({
            amount: params.amount,
            currency: params.currency,
            automatic_payment_methods: { enabled: true },
            metadata: params.metadata ?? {},
        });
        return {
            id: intent.id,
            clientSecret: intent.client_secret,
            amount: intent.amount,
            currency: intent.currency,
            status: intent.status,
        };
    }
    constructWebhookEvent(rawBody, signature) {
        const secret = this.config.get('payment.stripe.webhookSecret') ?? '';
        return this.stripe.webhooks.constructEvent(rawBody, signature, secret);
    }
};
exports.StripeProvider = StripeProvider;
exports.StripeProvider = StripeProvider = StripeProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeProvider);
//# sourceMappingURL=stripe.provider.js.map