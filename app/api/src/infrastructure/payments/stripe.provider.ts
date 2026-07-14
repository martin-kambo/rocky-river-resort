import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'
import type { StripePaymentProvider, PaymentIntent } from './payment-provider.interface'

@Injectable()
export class StripeProvider implements StripePaymentProvider {
  private readonly stripe: Stripe
  private readonly logger = new Logger(StripeProvider.name)

  constructor(private readonly config: ConfigService) {
    const key = config.get<string>('payment.stripe.secretKey')
    if (!key) {
      this.logger.warn('STRIPE_SECRET_KEY not set — Stripe payments will fail')
    }
    this.stripe = new Stripe(key ?? '', { apiVersion: '2024-04-10' })
  }

  async createPaymentIntent(params: {
    amount:    number
    currency:  string
    metadata?: Record<string, string>
  }): Promise<PaymentIntent> {
    const intent = await this.stripe.paymentIntents.create({
      amount:                    params.amount,
      currency:                  params.currency,
      automatic_payment_methods: { enabled: true },
      metadata:                  params.metadata ?? {},
    })

    return {
      id:           intent.id,
      clientSecret: intent.client_secret,
      amount:       intent.amount,
      currency:     intent.currency,
      status:       intent.status,
    }
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): unknown {
    const secret = this.config.get<string>('payment.stripe.webhookSecret') ?? ''
    return this.stripe.webhooks.constructEvent(rawBody, signature, secret)
  }
}