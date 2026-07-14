import { Module } from '@nestjs/common'
import { MediaController }  from './media.controller'
import { MediaService }     from './media.service'
import { MediaInfraModule } from '../../infrastructure/media/media.module'

@Module({
  imports:     [MediaInfraModule],
  controllers: [MediaController],
  providers:   [MediaService],
  exports:     [MediaService],
})
export class MediaModule {}