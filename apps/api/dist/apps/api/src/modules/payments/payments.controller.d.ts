import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { InitiateStripeDto } from './dto/initiate-stripe.dto';
import { InitiateMpesaDto } from './dto/initiate-mpesa.dto';
export declare class PaymentsController {
    private readonly payments;
    constructor(payments: PaymentsService);
    stripeIntent(dto: InitiateStripeDto): Promise<{
        clientSecret: string | null;
    }>;
    mpesaInitiate(dto: InitiateMpesaDto): Promise<{
        checkoutRequestId: string;
        message: string;
    }>;
    stripeWebhook(req: RawBodyRequest<Request>, sig: string): Promise<{
        received: boolean;
    }>;
    mpesaCallback(body: unknown): Promise<{
        received: boolean;
    }>;
}
