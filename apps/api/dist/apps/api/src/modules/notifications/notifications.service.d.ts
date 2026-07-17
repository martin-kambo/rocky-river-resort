import { ConfigService } from '@nestjs/config';
import { EmailProvider } from '../../infrastructure/email/email-provider.interface';
export declare class NotificationsService {
    private readonly email;
    private readonly config;
    private readonly logger;
    constructor(email: EmailProvider, config: ConfigService);
    sendBookingConfirmation(booking: BookingWithRelations): Promise<void>;
    sendCancellationNotice(booking: BookingWithRelations): Promise<void>;
    sendWelcome(email: string, firstName: string): Promise<void>;
    sendPasswordReset(email: string, name: string, resetUrl: string): Promise<void>;
    sendWhatsApp(booking: BookingWithRelations): Promise<void>;
    private toEmailData;
}
export interface BookingWithRelations {
    id: string;
    reference: string;
    checkIn: Date | string;
    checkOut: Date | string;
    nights: number;
    adults: number;
    totalKes: number | string;
    user: {
        email: string;
        firstName: string;
        lastName: string;
        phone?: string | null;
    };
    room: {
        roomType: {
            nameEn: string;
        };
    };
}
