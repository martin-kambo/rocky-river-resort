//apps/api/src/infrastructure/payments/payments-infrastructure.module.ts ===
import { Module } from '@nestjs/common'
import { StripeProvider } from './stripe.provider'
import { MpesaProvider }  from './mpesa.provider'
import { STRIPE_PROVIDER, MPESA_PROVIDER } from './payment-provider.interface'

@Module({
  providers: [
    { provide: STRIPE_PROVIDER, useClass: StripeProvider },
    { provide: MPESA_PROVIDER,  useClass: MpesaProvider  },
  ],
  exports: [STRIPE_PROVIDER, MPESA_PROVIDER],
})
export class PaymentsInfrastructureModule {}