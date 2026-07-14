import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where:  { id },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, role: true, nationality: true,
        preferredLocale: true, emailVerifiedAt: true, createdAt: true,
      },
    })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where:  { id },
      data:   {
        ...(dto.firstName       !== undefined && { firstName:       dto.firstName }),
        ...(dto.lastName        !== undefined && { lastName:        dto.lastName }),
        ...(dto.phone           !== undefined && { phone:           dto.phone }),
        ...(dto.nationality     !== undefined && { nationality:     dto.nationality }),
        ...(dto.preferredLocale !== undefined && { preferredLocale: dto.preferredLocale }),
      },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        phone: true, role: true, nationality: true,
        preferredLocale: true, createdAt: true,
      },
    })
  }
}