import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'
import type {
  MediaProvider,
  UploadResult,
  TransformOptions,
} from './media-provider.interface'

@Injectable()
export class CloudinaryMediaProvider implements MediaProvider {
  private readonly logger    = new Logger(CloudinaryMediaProvider.name)
  private readonly cloudName: string

  constructor(private readonly config: ConfigService) {
    this.cloudName = config.get<string>('CLOUDINARY_CLOUD_NAME', '')
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key:    config.get<string>('CLOUDINARY_API_KEY', ''),
      api_secret: config.get<string>('CLOUDINARY_API_SECRET', ''),
      secure:     true,
    })
    if (!this.cloudName) {
      this.logger.warn('CLOUDINARY_CLOUD_NAME not set — media uploads will fail')
    }
  }

  async upload(
    buffer:  Buffer,
    options: { folder: string; publicId?: string; tags?: string[] },
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder:        `rocky-river-resort/${options.folder}`,
          public_id:     options.publicId,
          tags:          options.tags ?? [],
          overwrite:     true,
          resource_type: 'image',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error('Upload failed'))
          resolve({
            publicId:  result.public_id,
            url:       result.url,
            secureUrl: result.secure_url,
            width:     result.width,
            height:    result.height,
            format:    result.format,
            bytes:     result.bytes,
          })
        },
      )
      Readable.from(buffer).pipe(stream)
    })
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
    this.logger.log(`Deleted media: ${publicId}`)
  }

  buildUrl(publicId: string, transforms: TransformOptions = {}): string {
    const t: Record<string, unknown> = {
      quality:      transforms.quality ?? 'auto',
      fetch_format: transforms.format  ?? 'auto',
    }
    if (transforms.width)   t.width   = transforms.width
    if (transforms.height)  t.height  = transforms.height
    if (transforms.crop)    t.crop    = transforms.crop
    if (transforms.gravity) t.gravity = transforms.gravity
    return cloudinary.url(publicId, { transformation: [t], secure: true })
  }

  thumbnail(publicId: string): string {
    return this.buildUrl(publicId, {
      width: 200, height: 200, crop: 'thumb', gravity: 'auto',
    })
  }

  hero(publicId: string): string {
    return this.buildUrl(publicId, {
      width: 1200, height: 800, crop: 'fill', gravity: 'auto',
    })
  }
}