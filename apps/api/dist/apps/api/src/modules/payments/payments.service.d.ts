import { PrismaService } from '../../database/prisma.service';
import { StripePaymentProvider, MpesaPaymentProvider } from '../../infrastructure/payments/payment-provider.interface';
export declare class PaymentsService {
    private readonly prisma;
    private readonly stripe;
    private readonly mpesa;
    private readonly logger;
    constructor(prisma: PrismaService, stripe: StripePaymentProvider, mpesa: MpesaPaymentProvider);
    initiateStripe(bookingId: string, currency: 'KES' | 'USD'): Promise<{
        clientSecret: string | null;
    }>;
    initiateMpesa(bookingId: string, phone: string): Promise<{
        checkoutRequestId: string;
        message: string;
    }>;
    handleStripeWebhook(rawBody: Buffer, signature: string): Promise<{
        received: boolean;
    }>;
    handleMpesaCallback(body: any): Promise<{
        received: boolean;
    }>;
    private confirmPayment;
}
