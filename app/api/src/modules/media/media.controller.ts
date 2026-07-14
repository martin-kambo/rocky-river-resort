// apps/api/src/modules/media/media.controller.ts ===
import {
  Controller, Post, Delete, Param, UploadedFile,
  UseGuards, UseInterceptors, BadRequestException,
} from '@nestjs/common'
import { FileInterceptor }                        from '@nestjs/platform-express'
import { ApiTags, ApiBearerAuth, ApiConsumes,
         ApiBody, ApiOperation }                  from '@nestjs/swagger'
import { JwtAuthGuard }  from '../auth/guards/jwt-auth.guard'
import { RolesGuard }    from '../../common/guards/roles.guard'
import { Roles }         from '../../common/decorators/roles.decorator'
import { MediaService }  from './media.service'

@ApiTags('media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('media')
export class MediaController {
  constructor(private readonly media: MediaService) {}

  @Post('rooms/:roomTypeSlug')
  @ApiOperation({ summary: 'Upload a room image (admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    limits:     { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (_req, file, cb) => {
      // 1. MIME type check
      if (!file.mimetype.startsWith('image/')) {
        return cb(new BadRequestException('Only image files are allowed'), false)
      }
      // 2. Extension allowlist — defence against spoofed MIME types
      const ext     = (file.originalname.split('.').pop() ?? '').toLowerCase()
      const allowed = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif'])
      if (!allowed.has(ext)) {
        return cb(
          new BadRequestException(
            `Extension .${ext} not allowed. Use: jpg, jpeg, png, webp, avif`,
          ),
          false,
        )
      }
      cb(null, true)
    },
  }))
  uploadRoomImage(
    @Param('roomTypeSlug') slug: string,
    @UploadedFile()        file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded')
    return this.media.uploadRoomImage(slug, file.buffer, file.originalname)
  }

  @Delete(':publicId(*)')
  @ApiOperation({ summary: 'Delete a media file by Cloudinary public ID (admin)' })
  deleteMedia(@Param('publicId') publicId: string) {
    return this.media.delete(publicId)
  }
}
