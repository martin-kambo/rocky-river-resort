import { Injectable, BadRequestException, Inject, Logger } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import {
  STRIPE_PROVIDER, MPESA_PROVIDER,
  StripePaymentProvider, MpesaPaymentProvider,
} from '../../infrastructure/payments/payment-provider.interface'
import { BookingStatus, PaymentStatus } from '../../common/enums'

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)

  constructor(
    private readonly prisma: PrismaService,
    @Inject(STRIPE_PROVIDER) private readonly stripe: StripePaymentProvider,
    @Inject(MPESA_PROVIDER)  private readonly mpesa:  MpesaPaymentProvider,
  ) {}

  async initiateStripe(bookingId: string, currency: 'KES' | 'USD') {
    const booking = await this.prisma.booking.findUniqueOrThrow({ where: { id: bookingId } })
    const raw     = currency === 'KES' ? Number(booking.totalKes) : Number(booking.totalUsd)
    const amount  = Math.round(raw * 100)

    const intent = await this.stripe.createPaymentIntent({
      amount,
      currency:  currency.toLowerCase(),
      metadata:  { bookingId, reference: booking.reference },
    })

    await this.prisma.payment.create({
      data: {
        bookingId,
        provider:    'STRIPE',
        providerRef: intent.id,
        amount:      raw,
        currency,
        status:      'PENDING',
      },
    })

    return { clientSecret: intent.clientSecret }
  }

  async initiateMpesa(bookingId: string, phone: string) {
    const booking = await this.prisma.booking.findUniqueOrThrow({ where: { id: bookingId } })
    const amount  = Math.ceil(Number(booking.totalKes))

    const result = await this.mpesa.initiateStk({
      phone,
      amount,
      accountRef:  booking.reference,
      description: `Rocky River Resort – ${booking.reference}`,
    })

    await this.prisma.payment.create({
      data: {
        bookingId,
        provider:    'MPESA',
        providerRef: result.checkoutRequestId,
        amount,
        currency:    'KES',
        status:      'PENDING',
        payload:     result.raw as object,
      },
    })

    return { checkoutRequestId: result.checkoutRequestId, message: result.customerMessage }
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    let event: any
    try {
      event = this.stripe.constructWebhookEvent(rawBody, signature)
    } catch {
      throw new BadRequestException('Invalid Stripe webhook signature')
    }

    if (event.type === 'payment_intent.succeeded') {
      await this.confirmPayment(event.data.object.id, event.data.object)
    } else if (event.type === 'payment_intent.payment_failed') {
      await this.prisma.payment.updateMany({
        where: { providerRef: event.data.object.id },
        data:  { status: PaymentStatus.FAILED as any },
      })
    }

    return { received: true }
  }

  async handleMpesaCallback(body: any) {
    const cb = body?.Body?.stkCallback
    if (!cb) return { received: true }

    const ref     = cb.CheckoutRequestID as string
    const success = cb.ResultCode === 0

    await this.prisma.payment.updateMany({
      where: { providerRef: ref },
      data: {
        status:  (success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED) as any,
        paidAt:  success ? new Date() : undefined,
        payload: body,
      },
    })

    if (success) {
      const payment = await this.prisma.payment.findFirst({ where: { providerRef: ref } })
      if (payment) {
        await this.prisma.booking.update({
          where: { id: payment.bookingId },
          data:  { status: BookingStatus.CONFIRMED as any, confirmedAt: new Date() },
        })
        this.logger.log(`M-Pesa payment confirmed: ${ref}`)
      }
    }

    return { received: true }
  }

  private async confirmPayment(providerRef: string, payload: unknown) {
    await this.prisma.$transaction(async (tx: any) => {
      await tx.payment.updateMany({
        where: { providerRef },
        data:  { status: PaymentStatus.SUCCESS, paidAt: new Date(), payload: payload as object },
      })
      const payment = await tx.payment.findFirst({ where: { providerRef } })
      if (payment) {
        await tx.booking.update({
          where: { id: payment.bookingId },
          data:  { status: BookingStatus.CONFIRMED, confirmedAt: new Date() },
        })
        this.logger.log(`Stripe payment confirmed: ${providerRef}`)
      }
    })
  }
}
EOF
cat "$REPO/apps/api/src/modules/payments/payments.service.ts"
Output

import { Injectable, BadRequestException, Inject, Logger } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import {
  STRIPE_PROVIDER, MPESA_PROVIDER,
  StripePaymentProvider, MpesaPaymentProvider,
} from '../../infrastructure/payments/payment-provider.interface'
import { BookingStatus, PaymentStatus } from '../../common/enums'

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)

  constructor(
    private readonly prisma: PrismaService,
    @Inject(STRIPE_PROVIDER) private readonly stripe: StripePaymentProvider,
    @Inject(MPESA_PROVIDER)  private readonly mpesa:  MpesaPaymentProvider,
  ) {}

  async initiateStripe(bookingId: string, currency: 'KES' | 'USD') {
    const booking = await this.prisma.booking.findUniqueOrThrow({ where: { id: bookingId } })
    const raw     = currency === 'KES' ? Number(booking.totalKes) : Number(booking.totalUsd)
    const amount  = Math.round(raw * 100)

    const intent = await this.stripe.createPaymentIntent({
      amount,
      currency:  currency.toLowerCase(),
      metadata:  { bookingId, reference: booking.reference },
    })

    await this.prisma.payment.create({
      data: {
        bookingId,
        provider:    'STRIPE',
        providerRef: intent.id,
        amount:      raw,
        currency,
        status:      'PENDING',
      },
    })

    return { clientSecret: intent.clientSecret }
  }

  async initiateMpesa(bookingId: string, phone: string) {
    const booking = await this.prisma.booking.findUniqueOrThrow({ where: { id: bookingId } })
    const amount  = Math.ceil(Number(booking.totalKes))

    const result = await this.mpesa.initiateStk({
      phone,
      amount,
      accountRef:  booking.reference,
      description: `Rocky River Resort – ${booking.reference}`,
    })

    await this.prisma.payment.create({
      data: {
        bookingId,
        provider:    'MPESA',
        providerRef: result.checkoutRequestId,
        amount,
        currency:    'KES',
        status:      'PENDING',
        payload:     result.raw as object,
      },
    })

    return { checkoutRequestId: result.checkoutRequestId, message: result.customerMessage }
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    let event: any
    try {
      event = this.stripe.constructWebhookEvent(rawBody, signature)
    } catch {
      throw new BadRequestException('Invalid Stripe webhook signature')
    }

    if (event.type === 'payment_intent.succeeded') {
      await this.confirmPayment(event.data.object.id, event.data.object)
    } else if (event.type === 'payment_intent.payment_failed') {
      await this.prisma.payment.updateMany({
        where: { providerRef: event.data.object.id },
        data:  { status: PaymentStatus.FAILED as any },
      })
    }

    return { received: true }
  }

  async handleMpesaCallback(body: any) {
    const cb = body?.Body?.stkCallback
    if (!cb) return { received: true }

    const ref     = cb.CheckoutRequestID as string
    const success = cb.ResultCode === 0

    await this.prisma.payment.updateMany({
      where: { providerRef: ref },
      data: {
        status:  (success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED) as any,
        paidAt:  success ? new Date() : undefined,
        payload: body,
      },
    })

    if (success) {
      const payment = await this.prisma.payment.findFirst({ where: { providerRef: ref } })
      if (payment) {
        await this.prisma.booking.update({
          where: { id: payment.bookingId },
          data:  { status: BookingStatus.CONFIRMED as any, confirmedAt: new Date() },
        })
        this.logger.log(`M-Pesa payment confirmed: ${ref}`)
      }
    }

    return { received: true }
  }

  private async confirmPayment(providerRef: string, payload: unknown) {
    await this.prisma.$transaction(async (tx: any) => {
      await tx.payment.updateMany({
        where: { providerRef },
        data:  { status: PaymentStatus.SUCCESS, paidAt: new Date(), payload: payload as object },
      })
      const payment = await tx.payment.findFirst({ where: { providerRef } })
      if (payment) {
        await tx.booking.update({
          where: { id: payment.bookingId },
          data:  { status: BookingStatus.CONFIRMED, confirmedAt: new Date() },
        })
        this.logger.log(`Stripe payment confirmed: ${providerRef}`)
      }
    })
  }
}