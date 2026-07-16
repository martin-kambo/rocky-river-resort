import { Module } from '@nestjs/common'
import { PaymentsController }           from './payments.controller'
import { PaymentsService }              from './payments.service'
import { PaymentsInfrastructureModule } from '../../infrastructure/payments/payments-infrastructure.module'

@Module({
  imports:     [PaymentsInfrastructureModule],
  controllers: [PaymentsController],
  providers:   [PaymentsService],
  exports:     [PaymentsService],
})
export class PaymentsModule {}
