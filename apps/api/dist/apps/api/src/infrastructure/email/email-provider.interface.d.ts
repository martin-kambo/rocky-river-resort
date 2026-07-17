export interface BookingEmailData {
    reference: string;
    guestName: string;
    guestEmail: string;
    roomName: string;
    checkIn: Date | string;
    checkOut: Date | string;
    nights: number;
    adults: number;
    totalKes: number;
    phone?: string | null;
}
export interface PasswordResetEmailData {
    email: string;
    resetUrl: string;
    name: string;
}
export interface WelcomeEmailData {
    email: string;
    firstName: string;
}
export interface EmailProvider {
    sendBookingConfirmation(data: BookingEmailData): Promise<void>;
    sendCancellationNotice(data: BookingEmailData): Promise<void>;
    sendPasswordReset(data: PasswordResetEmailData): Promise<void>;
    sendWelcome(data: WelcomeEmailData): Promise<void>;
}
export declare const EMAIL_PROVIDER = "EMAIL_PROVIDER";
