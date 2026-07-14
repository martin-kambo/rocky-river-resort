import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException }   from '@nestjs/common'
import { RoomsService }        from './rooms.service'
import { PrismaService }       from '../../database/prisma.service'

const mockRoomTypes = [
  { id: 'rt-1', slug: 'river-suite',  nameEn: 'River Suite',  isActive: true, sortOrder: 1, images: [], rooms: [] },
  { id: 'rt-2', slug: 'family-villa', nameEn: 'Family Villa', isActive: true, sortOrder: 4, images: [], rooms: [] },
]

const mockPrisma = {
  roomType: {
    findMany:  jest.fn(),
    findUnique: jest.fn(),
  },
}

describe('RoomsService', () => {
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile()
    service = module.get<RoomsService>(RoomsService)
    jest.clearAllMocks()
  })

  describe('findAll', () => {
    it('returns only active room types ordered by sortOrder', async () => {
      mockPrisma.roomType.findMany.mockResolvedValue(mockRoomTypes)
      const result = await service.findAll()
      expect(result).toHaveLength(2)
      expect(mockPrisma.roomType.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
      )
    })

    it('returns empty array when no active room types', async () => {
      mockPrisma.roomType.findMany.mockResolvedValue([])
      const result = await service.findAll()
      expect(result).toEqual([])
    })
  })

  describe('findBySlug', () => {
    it('returns room type for valid slug', async () => {
      mockPrisma.roomType.findUnique.mockResolvedValue(mockRoomTypes[0])
      const result = await service.findBySlug('river-suite')
      expect(result.slug).toBe('river-suite')
    })

    it('throws NotFoundException for unknown slug', async () => {
      mockPrisma.roomType.findUnique.mockResolvedValue(null)
      await expect(service.findBySlug('ghost-room')).rejects.toThrow(NotFoundException)
    })
  })
})