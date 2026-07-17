import { ConfigService } from '@nestjs/config';
import type { StripePaymentProvider, PaymentIntent } from './payment-provider.interface';
export declare class StripeProvider implements StripePaymentProvider {
    private readonly config;
    private readonly stripe;
    private readonly logger;
    constructor(config: ConfigService);
    createPaymentIntent(params: {
        amount: number;
        currency: string;
        metadata?: Record<string, string>;
    }): Promise<PaymentIntent>;
    constructWebhookEvent(rawBody: Buffer, signature: string): unknown;
}
