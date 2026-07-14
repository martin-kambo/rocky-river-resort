import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Resend } from 'resend'
import type {
  EmailProvider,
  BookingEmailData,
  PasswordResetEmailData,
  WelcomeEmailData,
} from './email-provider.interface'

@Injectable()
export class ResendEmailProvider implements EmailProvider {
  private readonly client: Resend
  private readonly from:   string
  private readonly logger = new Logger(ResendEmailProvider.name)

  constructor(private readonly config: ConfigService) {
    this.client = new Resend(config.getOrThrow<string>('RESEND_API_KEY'))
    this.from   = config.get<string>('EMAIL_FROM', 'Rocky River Resort <hello@rockyriverresort.co.ke>')
  }

  async sendBookingConfirmation(data: BookingEmailData): Promise<void> {
    const checkIn  = this.formatDate(new Date(data.checkIn))
    const checkOut = this.formatDate(new Date(data.checkOut))

    await this.send({
      to:      data.guestEmail,
      subject: `Booking confirmed – ${data.reference} | Rocky River Resort`,
      html:    this.confirmationTemplate({ ...data, checkIn, checkOut }),
    })
  }

  async sendCancellationNotice(data: BookingEmailData): Promise<void> {
    const checkIn  = this.formatDate(new Date(data.checkIn))
    const checkOut = this.formatDate(new Date(data.checkOut))

    await this.send({
      to:      data.guestEmail,
      subject: `Booking cancelled – ${data.reference} | Rocky River Resort`,
      html:    this.cancellationTemplate({ ...data, checkIn, checkOut }),
    })
  }

  async sendPasswordReset(data: PasswordResetEmailData): Promise<void> {
    await this.send({
      to:      data.email,
      subject: 'Reset your password — Rocky River Resort',
      html:    this.passwordResetTemplate(data),
    })
  }

  async sendWelcome(data: WelcomeEmailData): Promise<void> {
    await this.send({
      to:      data.email,
      subject: 'Welcome to Rocky River Resort',
      html:    this.welcomeTemplate(data),
    })
  }

  // ── private helpers ─────────────────────────────────────────────────────────

  private async send(params: { to: string; subject: string; html: string }) {
    try {
      const { error } = await this.client.emails.send({
        from:    this.from,
        to:      params.to,
        subject: params.subject,
        html:    params.html,
      })
      if (error) {
        this.logger.error(`Resend error for <${params.to}>: ${JSON.stringify(error)}`)
      } else {
        this.logger.log(`Email sent → ${params.to} — "${params.subject}"`)
      }
    } catch (err) {
      // Log and swallow — a failed email must never crash a booking request
      this.logger.error(`Failed to send email to ${params.to}`, err)
    }
  }

  private formatDate(d: Date | string): string {
    return new Date(d).toLocaleDateString('en-KE', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  // ── HTML email templates ────────────────────────────────────────────────────

  private confirmationTemplate(d: BookingEmailData & { checkIn: string; checkOut: string }) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Booking Confirmed</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06)">
    <!-- Header -->
    <div style="background:#1C3A2B;padding:32px 40px;text-align:center">
      <h1 style="color:#F5F0E8;font-size:22px;font-weight:300;margin:0;letter-spacing:.04em">Rocky River Resort</h1>
      <p style="color:#C8A85A;font-size:13px;margin:8px 0 0;letter-spacing:.06em;text-transform:uppercase">Booking Confirmed</p>
    </div>
    <!-- Body -->
    <div style="padding:36px 40px">
      <p style="color:#2C2418;font-size:15px;margin:0 0 16px">Dear ${d.guestName},</p>
      <p style="color:#6b5c48;font-size:14px;line-height:1.7;margin:0 0 24px">
        Your reservation at Rocky River Resort is confirmed. We look forward to welcoming you to the Athi River.
      </p>
      <!-- Reference badge -->
      <div style="background:#F5F0E8;border-radius:6px;padding:16px 20px;margin-bottom:24px;text-align:center">
        <p style="color:#8a7a65;font-size:10px;text-transform:uppercase;letter-spacing:.1em;margin:0 0 4px">Booking reference</p>
        <p style="color:#1C3A2B;font-size:26px;font-weight:300;margin:0;letter-spacing:.04em">${d.reference}</p>
      </div>
      <!-- Details table -->
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${[
          ['Room',        d.roomName],
          ['Check-in',   `${d.checkIn} · from 2:00 PM`],
          ['Check-out',  `${d.checkOut} · by 11:00 AM`],
          ['Nights',     String(d.nights)],
          ['Guests',     `${d.adults} adult${d.adults !== 1 ? 's' : ''}`],
          ['Total paid', `KES ${d.totalKes.toLocaleString()}`],
        ].map(([label, value]) => `
        <tr style="border-top:1px solid #E8DCC8">
          <td style="padding:10px 0;color:#6b5c48">${label}</td>
          <td style="padding:10px 0;color:#2C2418;font-weight:500;text-align:right">${value}</td>
        </tr>`).join('')}
      </table>
      <!-- Contact -->
      <div style="background:#1C3A2B;border-radius:6px;padding:16px 20px;margin-top:28px;text-align:center">
        <p style="color:rgba(245,240,232,.6);font-size:12px;margin:0 0 4px">Need help? Contact us on WhatsApp</p>
        <p style="color:#C8A85A;font-size:16px;font-weight:500;margin:0">+254 700 000 000</p>
      </div>
    </div>
    <!-- Footer -->
    <div style="padding:16px 40px;border-top:1px solid #E8DCC8;text-align:center">
      <p style="color:#8a7a65;font-size:11px;margin:0">
        © ${new Date().getFullYear()} Rocky River Resort · Thika East, Kenya
      </p>
    </div>
  </div>
</body>
</html>`
  }

  private cancellationTemplate(d: BookingEmailData & { checkIn: string; checkOut: string }) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Booking Cancelled</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden">
    <div style="background:#2C2418;padding:28px 40px;text-align:center">
      <h1 style="color:#F5F0E8;font-size:20px;font-weight:300;margin:0">Booking Cancelled</h1>
      <p style="color:#C8A85A;font-size:12px;margin:6px 0 0;letter-spacing:.06em">${d.reference}</p>
    </div>
    <div style="padding:32px 40px">
      <p style="color:#2C2418;font-size:14px;line-height:1.7">Dear ${d.guestName},</p>
      <p style="color:#6b5c48;font-size:14px;line-height:1.7">
        Your booking for the <strong>${d.roomName}</strong> (${d.checkIn} – ${d.checkOut}) has been cancelled.
        If a refund applies, it will be processed within 3–5 business days.
      </p>
      <p style="color:#6b5c48;font-size:14px;line-height:1.7;margin-top:16px">
        To make a new reservation or if you have questions, contact us at
        <a href="mailto:hello@rockyriverresort.co.ke" style="color:#C8A85A">hello@rockyriverresort.co.ke</a>
        or WhatsApp <strong>+254 700 000 000</strong>.
      </p>
    </div>
  </div>
</body>
</html>`
  }

  private passwordResetTemplate(d: PasswordResetEmailData) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Reset your password</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden">
    <div style="background:#1C3A2B;padding:24px 32px;text-align:center">
      <h1 style="color:#F5F0E8;font-size:18px;font-weight:300;margin:0">Password reset</h1>
    </div>
    <div style="padding:32px">
      <p style="color:#2C2418;font-size:14px;line-height:1.7">Hi ${d.name},</p>
      <p style="color:#6b5c48;font-size:14px;line-height:1.7">
        Click the button below to reset your Rocky River Resort password.
        This link expires in 1 hour.
      </p>
      <div style="text-align:center;margin:28px 0">
        <a href="${d.resetUrl}"
           style="background:#C8A85A;color:#1A1208;text-decoration:none;padding:12px 32px;border-radius:4px;font-weight:500;font-size:14px;display:inline-block">
          Reset password
        </a>
      </div>
      <p style="color:#8a7a65;font-size:12px">If you didn't request this, ignore this email — your account is safe.</p>
    </div>
  </div>
</body>
</html>`
  }

  private welcomeTemplate(d: WelcomeEmailData) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Welcome to Rocky River Resort</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden">
    <div style="background:#1C3A2B;padding:28px 32px;text-align:center">
      <h1 style="color:#F5F0E8;font-size:20px;font-weight:300;margin:0">Welcome, ${d.firstName}</h1>
      <p style="color:#C8A85A;font-size:12px;margin:8px 0 0;letter-spacing:.06em">ROCKY RIVER RESORT</p>
    </div>
    <div style="padding:32px">
      <p style="color:#6b5c48;font-size:14px;line-height:1.7">
        Your account has been created. You can now browse our rooms, check availability,
        and manage your bookings from your guest dashboard.
      </p>
      <div style="text-align:center;margin:24px 0">
        <a href="${this.config.get('NEXT_PUBLIC_BASE_URL', 'https://rockyriverresort.co.ke')}/book"
           style="background:#C8A85A;color:#1A1208;text-decoration:none;padding:12px 32px;border-radius:4px;font-weight:500;font-size:14px;display:inline-block">
          Explore rooms →
        </a>
      </div>
      <p style="color:#8a7a65;font-size:12px;text-align:center">
        Along the Athi River · Thika East, Kenya · +254 700 000 000
      </p>
    </div>
  </div>
</body>
</html>`
  }
}