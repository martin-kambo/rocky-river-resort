import { Test, TestingModule }  from '@nestjs/testing'
import { NotificationsService } from './notifications.service'
import { ConfigService }        from '@nestjs/config'
import { EMAIL_PROVIDER }       from '../../infrastructure/email/email-provider.interface'

const mockEmailProvider = {
  sendBookingConfirmation: jest.fn(),
  sendCancellationNotice:  jest.fn(),
  sendPasswordReset:       jest.fn(),
  sendWelcome:             jest.fn(),
}

const mockConfig = {
  get: jest.fn((key: string) => {
    if (key === 'NEXT_PUBLIC_BASE_URL') return 'https://rockyriverresort.co.ke'
    return null
  }),
}

const mockBooking = {
  id:        'booking-1',
  reference: 'RRR-ABCDEF',
  checkIn:   new Date('2025-07-12'),
  checkOut:  new Date('2025-07-14'),
  nights:    2,
  adults:    2,
  totalKes:  56000,
  user: {
    email:     'guest@example.com',
    firstName: 'Amara',
    lastName:  'Ochieng',
    phone:     '+254712345678',
  },
  room: { roomType: { nameEn: 'River Suite' } },
}

describe('NotificationsService', () => {
  let service: NotificationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: EMAIL_PROVIDER, useValue: mockEmailProvider },
        { provide: ConfigService,  useValue: mockConfig        },
      ],
    }).compile()
    service = module.get<NotificationsService>(NotificationsService)
    jest.clearAllMocks()
  })

  describe('sendBookingConfirmation', () => {
    it('calls email provider with correct BookingEmailData', async () => {
      mockEmailProvider.sendBookingConfirmation.mockResolvedValue(undefined)
      await service.sendBookingConfirmation(mockBooking as any)
      expect(mockEmailProvider.sendBookingConfirmation).toHaveBeenCalledWith(
        expect.objectContaining({
          reference:  'RRR-ABCDEF',
          guestName:  'Amara Ochieng',
          guestEmail: 'guest@example.com',
          roomName:   'River Suite',
          nights:     2,
          totalKes:   56000,
        }),
      )
    })
  })

  describe('sendCancellationNotice', () => {
    it('calls email provider with cancellation data', async () => {
      mockEmailProvider.sendCancellationNotice.mockResolvedValue(undefined)
      await service.sendCancellationNotice(mockBooking as any)
      expect(mockEmailProvider.sendCancellationNotice).toHaveBeenCalledWith(
        expect.objectContaining({ reference: 'RRR-ABCDEF' }),
      )
    })
  })

  describe('sendWelcome', () => {
    it('sends welcome email to new guest', async () => {
      mockEmailProvider.sendWelcome.mockResolvedValue(undefined)
      await service.sendWelcome('guest@example.com', 'Amara')
      expect(mockEmailProvider.sendWelcome).toHaveBeenCalledWith({
        email: 'guest@example.com', firstName: 'Amara',
      })
    })
  })

  describe('sendPasswordReset', () => {
    it('sends password reset email with correct URL', async () => {
      mockEmailProvider.sendPasswordReset.mockResolvedValue(undefined)
      await service.sendPasswordReset(
        'guest@example.com', 'Amara Ochieng',
        'https://rockyriverresort.co.ke/reset-password?token=abc123',
      )
      expect(mockEmailProvider.sendPasswordReset).toHaveBeenCalledWith({
        email:    'guest@example.com',
        name:     'Amara Ochieng',
        resetUrl: 'https://rockyriverresort.co.ke/reset-password?token=abc123',
      })
    })
  })

  describe('sendWhatsApp', () => {
    it('logs intent when phone is present', async () => {
      const logSpy = jest.spyOn(service['logger'], 'log').mockImplementation()
      await service.sendWhatsApp(mockBooking as any)
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('WhatsApp'))
    })

    it('logs warning when guest has no phone number', async () => {
      const warnSpy = jest.spyOn(service['logger'], 'warn').mockImplementation()
      const noPhone = { ...mockBooking, user: { ...mockBooking.user, phone: null } }
      await service.sendWhatsApp(noPhone as any)
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('No phone'))
    })
  })
})
