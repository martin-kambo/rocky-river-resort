import { ConfigService } from '@nestjs/config';
import type { MpesaPaymentProvider, StkPushResult } from './payment-provider.interface';
export declare class MpesaProvider implements MpesaPaymentProvider {
    private readonly config;
    private readonly logger;
    private readonly baseUrl;
    constructor(config: ConfigService);
    initiateStk(params: {
        phone: string;
        amount: number;
        accountRef: string;
        description: string;
    }): Promise<StkPushResult>;
    private getAccessToken;
}
