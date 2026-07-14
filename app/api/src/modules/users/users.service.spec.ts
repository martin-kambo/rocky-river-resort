import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException }   from '@nestjs/common'
import { UsersService }        from './users.service'
import { PrismaService }       from '../../database/prisma.service'

const mockUser = {
  id: 'user-1', email: 'guest@example.com',
  firstName: 'Amara', lastName: 'Ochieng',
  phone: '+254712345678', role: 'guest',
  nationality: 'KEN', preferredLocale: 'en',
}

const mockPrisma = {
  user: { findUnique: jest.fn(), update: jest.fn() },
}

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile()
    service = module.get<UsersService>(UsersService)
    jest.clearAllMocks()
  })

  describe('findById', () => {
    it('returns user without passwordHash', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser)
      const result = await service.findById('user-1')
      expect(result).toEqual(mockUser)
      expect(result).not.toHaveProperty('passwordHash')
    })

    it('throws NotFoundException for unknown id', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null)
      await expect(service.findById('unknown')).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('updates only allowed fields', async () => {
      const updated = { ...mockUser, firstName: 'Wanjiru' }
      mockPrisma.user.update.mockResolvedValue(updated)
      const result = await service.update('user-1', { firstName: 'Wanjiru' })
      expect(result.firstName).toBe('Wanjiru')
      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.not.objectContaining({ role: expect.anything() }) }),
      )
    })

    it('updates preferredLocale', async () => {
      mockPrisma.user.update.mockResolvedValue({ ...mockUser, preferredLocale: 'sw' })
      const result = await service.update('user-1', { preferredLocale: 'sw' })
      expect(result.preferredLocale).toBe('sw')
    })
  })
})