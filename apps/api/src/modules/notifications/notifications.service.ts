import { Injectable, Inject, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  EMAIL_PROVIDER,
  EmailProvider,
  BookingEmailData,
} from '../../infrastructure/email/email-provider.interface'

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)

  constructor(
    @Inject(EMAIL_PROVIDER) private readonly email: EmailProvider,
    private readonly config: ConfigService,
  ) {}

  async sendBookingConfirmation(booking: BookingWithRelations): Promise<void> {
    const data = this.toEmailData(booking)
    await this.email.sendBookingConfirmation(data)
    this.logger.log(`Confirmation sent → ${booking.user.email} [${booking.reference}]`)
  }

  async sendCancellationNotice(booking: BookingWithRelations): Promise<void> {
    const data = this.toEmailData(booking)
    await this.email.sendCancellationNotice(data)
    this.logger.log(`Cancellation notice sent → ${booking.user.email} [${booking.reference}]`)
  }

  async sendWelcome(email: string, firstName: string): Promise<void> {
    await this.email.sendWelcome({ email, firstName })
    this.logger.log(`Welcome email sent → ${email}`)
  }

  async sendPasswordReset(email: string, name: string, resetUrl: string): Promise<void> {
    await this.email.sendPasswordReset({ email, name, resetUrl })
    this.logger.log(`Password reset sent → ${email}`)
  }

  async sendWhatsApp(booking: BookingWithRelations): Promise<void> {
    const phone = booking.user.phone
    if (!phone) {
      this.logger.warn(`No phone for WhatsApp notification [${booking.reference}]`)
      return
    }
    this.logger.log(`[Phase 2] WhatsApp queued → ${phone} [${booking.reference}]`)
  }

  private toEmailData(booking: BookingWithRelations): BookingEmailData {
    return {
      reference:  booking.reference,
      guestName:  `${booking.user.firstName} ${booking.user.lastName}`,
      guestEmail: booking.user.email,
      roomName:   booking.room.roomType.nameEn,
      checkIn:    new Date(booking.checkIn),
      checkOut:   new Date(booking.checkOut),
      nights:     booking.nights,
      adults:     booking.adults,
      totalKes:   Number(booking.totalKes),
      phone:      booking.user.phone,
    }
  }
}

export interface BookingWithRelations {
  id:         string
  reference:  string
  checkIn:    Date | string
  checkOut:   Date | string
  nights:     number
  adults:     number
  totalKes:   number | string
  user: {
    email:     string
    firstName: string
    lastName:  string
    phone?:    string | null
  }
  room: {
    roomType: { nameEn: string }
  }
}