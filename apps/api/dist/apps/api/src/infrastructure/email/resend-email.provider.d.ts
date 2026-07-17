import { ConfigService } from '@nestjs/config';
import type { EmailProvider, BookingEmailData, PasswordResetEmailData, WelcomeEmailData } from './email-provider.interface';
export declare class ResendEmailProvider implements EmailProvider {
    private readonly config;
    private readonly client;
    private readonly from;
    private readonly logger;
    constructor(config: ConfigService);
    sendBookingConfirmation(data: BookingEmailData): Promise<void>;
    sendCancellationNotice(data: BookingEmailData): Promise<void>;
    sendPasswordReset(data: PasswordResetEmailData): Promise<void>;
    sendWelcome(data: WelcomeEmailData): Promise<void>;
    private send;
    private formatDate;
    private confirmationTemplate;
    private cancellationTemplate;
    private passwordResetTemplate;
    private welcomeTemplate;
}
