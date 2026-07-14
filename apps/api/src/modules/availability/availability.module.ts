//apps/api/src/modules/availability/availability.module.ts ===
import { Module } from '@nestjs/common'
import { AvailabilityController } from './availability.controller'
import { AvailabilityService }    from './availability.service'

@Module({
  controllers: [AvailabilityController],
  providers:   [AvailabilityService],
  exports:     [AvailabilityService],
})
export class AvailabilityModule {}