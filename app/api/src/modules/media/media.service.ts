import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { PrismaService }  from '../../database/prisma.service'
import { MEDIA_PROVIDER } from '../../infrastructure/media/media-provider.interface'
import type { MediaProvider } from '../../infrastructure/media/media-provider.interface'
import { slugify }        from '@rrr/utils'

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma:                        PrismaService,
    @Inject(MEDIA_PROVIDER) private readonly media: MediaProvider,
  ) {}

  async uploadRoomImage(
    roomTypeSlug: string,
    buffer:       Buffer,
    filename:     string,
  ) {
    const roomType = await this.prisma.roomType.findUnique({
      where:   { slug: roomTypeSlug },
      include: { images: true },
    })
    if (!roomType) throw new NotFoundException(`Room type '${roomTypeSlug}' not found`)

    const baseName = filename.replace(/\.[^.]+$/, '')
    const publicId = `${roomTypeSlug}/${slugify(baseName)}-${Date.now()}`

    const result = await this.media.upload(buffer, {
      folder:   'rooms',
      publicId,
      tags:     ['room', roomTypeSlug],
    })

    const isHero = roomType.images.length === 0

    const image = await this.prisma.roomImage.create({
      data: {
        roomTypeId: roomType.id,
        url:        result.secureUrl,
        altEn:      `${roomType.nameEn} — ${baseName}`,
        altSw:      `${roomType.nameSw} — ${baseName}`,
        sortOrder:  roomType.images.length,
        isHero,
      },
    })

    return {
      image,
      cdn: {
        original:  result.secureUrl,
        hero:      this.media.hero(result.publicId),
        thumbnail: this.media.thumbnail(result.publicId),
      },
    }
  }

  async delete(publicId: string) {
    await this.media.delete(publicId)
    return { deleted: true, publicId }
  }
}