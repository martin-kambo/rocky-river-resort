import { Test, TestingModule }   from '@nestjs/testing'
import { BadRequestException }   from '@nestjs/common'
import { PaymentsService }       from './payments.service'
import { PrismaService }         from '../../database/prisma.service'
import {
  STRIPE_PROVIDER, MPESA_PROVIDER,
} from '../../infrastructure/payments/payment-provider.interface'

const mockBooking = {
  id: 'booking-1', reference: 'RRR-ABCDEF',
  totalKes: 56000, totalUsd: 430,
}

const mockPrisma = {
  booking:  { findUniqueOrThrow: jest.fn().mockResolvedValue(mockBooking), update: jest.fn() },
  payment:  { create: jest.fn(), findFirst: jest.fn(), updateMany: jest.fn() },
  $transaction: jest.fn(),
}

const mockStripe = {
  createPaymentIntent:   jest.fn(),
  constructWebhookEvent: jest.fn(),
}

const mockMpesa = { initiateStk: jest.fn() }

describe('PaymentsService', () => {
  let service: PaymentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PrismaService,   useValue: mockPrisma },
        { provide: STRIPE_PROVIDER, useValue: mockStripe },
        { provide: MPESA_PROVIDER,  useValue: mockMpesa  },
      ],
    }).compile()
    service = module.get<PaymentsService>(PaymentsService)
    jest.clearAllMocks()
    mockPrisma.booking.findUniqueOrThrow.mockResolvedValue(mockBooking)
    mockPrisma.payment.create.mockResolvedValue({ id: 'pay-1', bookingId: 'booking-1' })
  })

  describe('initiateStripe', () => {
    it('creates a PaymentIntent in KES and persists payment record', async () => {
      mockStripe.createPaymentIntent.mockResolvedValue({
        id: 'pi_test', clientSecret: 'cs_test',
        amount: 5600000, currency: 'kes', status: 'requires_payment_method',
      })
      const result = await service.initiateStripe('booking-1', 'KES')
      expect(mockStripe.createPaymentIntent).toHaveBeenCalledWith({
        amount: 5600000, currency: 'kes',
        metadata: { bookingId: 'booking-1', reference: 'RRR-ABCDEF' },
      })
      expect(mockPrisma.payment.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ provider: 'STRIPE', status: 'PENDING' }) }),
      )
      expect(result.clientSecret).toBe('cs_test')
    })

    it('creates PaymentIntent in USD with correct amount', async () => {
      mockStripe.createPaymentIntent.mockResolvedValue({
        id: 'pi_usd', clientSecret: 'cs_usd',
        amount: 43000, currency: 'usd', status: 'requires_payment_method',
      })
      await service.initiateStripe('booking-1', 'USD')
      expect(mockStripe.createPaymentIntent).toHaveBeenCalledWith(
        expect.objectContaining({ amount: 43000, currency: 'usd' }),
      )
    })
  })

  describe('initiateMpesa', () => {
    it('initiates STK push with correct phone and amount', async () => {
      mockMpesa.initiateStk.mockResolvedValue({
        checkoutRequestId: 'ws_CO_test', merchantRequestId: 'mr_test',
        customerMessage: 'Request accepted', raw: {},
      })
      const result = await service.initiateMpesa('booking-1', '+254712345678')
      expect(mockMpesa.initiateStk).toHaveBeenCalledWith(
        expect.objectContaining({ phone: '+254712345678', amount: 56000, accountRef: 'RRR-ABCDEF' }),
      )
      expect(result.checkoutRequestId).toBe('ws_CO_test')
    })
  })

  describe('handleStripeWebhook', () => {
    it('throws BadRequestException for invalid signature', async () => {
      mockStripe.constructWebhookEvent.mockImplementation(() => {
        throw new Error('No signatures found')
      })
      await expect(
        service.handleStripeWebhook(Buffer.from('{}'), 'bad-sig'),
      ).rejects.toThrow(BadRequestException)
    })

    it('returns received:true for payment_intent.succeeded', async () => {
      mockStripe.constructWebhookEvent.mockReturnValue({
        type: 'payment_intent.succeeded', data: { object: { id: 'pi_test' } },
      })
      mockPrisma.$transaction.mockImplementation (async (fn: (tx: typeof mockPrisma) => Promise<unknown>) => fn(mockPrisma),)
      mockPrisma.payment.findFirst.mockResolvedValue({ id: 'pay-1', bookingId: 'booking-1' })
      mockPrisma.payment.updateMany.mockResolvedValue({ count: 1 })
      mockPrisma.booking.update.mockResolvedValue({})
      const result = await service.handleStripeWebhook(Buffer.from('{}'), 'valid-sig')
      expect(result).toEqual({ received: true })
    })
  })

  describe('handleMpesaCallback', () => {
    it('returns received:true for malformed body', async () => {
      const result = await service.handleMpesaCallback({})
      expect(result).toEqual({ received: true })
      expect(mockPrisma.payment.updateMany).not.toHaveBeenCalled()
    })

    it('marks payment FAILED on non-zero ResultCode', async () => {
      mockPrisma.payment.updateMany.mockResolvedValue({ count: 1 })
      await service.handleMpesaCallback({
        Body: { stkCallback: { CheckoutRequestID: 'ws_CO_test', ResultCode: 1032 } },
      })
      expect(mockPrisma.payment.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ status: 'FAILED' }) }),
      )
    })
  })
})
