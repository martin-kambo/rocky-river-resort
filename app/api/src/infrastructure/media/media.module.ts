import { Module } from '@nestjs/common'
import { CloudinaryMediaProvider } from './cloudinary-media.provider'
import { MEDIA_PROVIDER }          from './media-provider.interface'

@Module({
  providers: [
    { provide: MEDIA_PROVIDER, useClass: CloudinaryMediaProvider },
  ],
  exports: [MEDIA_PROVIDER],
})
export class MediaInfraModule {}