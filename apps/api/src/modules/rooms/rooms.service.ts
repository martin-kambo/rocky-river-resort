import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.roomType.findMany({
      where:   { isActive: true },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        rooms: {
          where:  { status: 'available' },
          select: { id: true },
        },
      },
      orderBy: { sortOrder: 'asc' },
    })
  }

  async findBySlug(slug: string) {
    const roomType = await this.prisma.roomType.findUnique({
      where:   { slug, isActive: true },
      include: {
        images: { orderBy: { sortOrder: 'asc' } },
        seasonalPricing: {
          where:   { endDate: { gte: new Date() } },
          orderBy: { startDate: 'asc' },
        },
        rooms: {
          where:  { status: 'available' },
          select: { id: true, roomNumber: true, floor: true, viewType: true },
        },
      },
    })

    if (!roomType) throw new NotFoundException(`Room type '${slug}' not found`)
    return roomType
  }
}