export interface PaymentIntent {
    id: string;
    clientSecret: string | null;
    amount: number;
    currency: string;
    status: string;
}
export interface StkPushResult {
    checkoutRequestId: string;
    merchantRequestId: string;
    customerMessage: string;
    raw: Record<string, unknown>;
}
export interface StripePaymentProvider {
    createPaymentIntent(params: {
        amount: number;
        currency: string;
        metadata?: Record<string, string>;
    }): Promise<PaymentIntent>;
    constructWebhookEvent(rawBody: Buffer, signature: string): unknown;
}
export interface MpesaPaymentProvider {
    initiateStk(params: {
        phone: string;
        amount: number;
        accountRef: string;
        description: string;
    }): Promise<StkPushResult>;
}
export declare const STRIPE_PROVIDER = "STRIPE_PROVIDER";
export declare const MPESA_PROVIDER = "MPESA_PROVIDER";
