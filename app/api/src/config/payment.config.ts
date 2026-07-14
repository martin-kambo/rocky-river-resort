import { registerAs } from '@nestjs/config'

export default registerAs('payment', () => ({
  stripe: {
    secretKey:     process.env.STRIPE_SECRET_KEY     ?? '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  },
  mpesa: {
    environment:    process.env.MPESA_ENVIRONMENT    ?? 'sandbox',
    consumerKey:    process.env.MPESA_CONSUMER_KEY   ?? '',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET ?? '',
    shortcode:      process.env.MPESA_SHORTCODE      ?? '174379',
    passkey:        process.env.MPESA_PASSKEY        ?? '',
    callbackUrl:    process.env.MPESA_CALLBACK_URL   ?? '',
  },
  resend: {
    apiKey:   process.env.RESEND_API_KEY ?? '',
    from:     process.env.EMAIL_FROM     ?? 'Rocky River Resort <hello@rockyriverresort.co.ke>',
  },
}))