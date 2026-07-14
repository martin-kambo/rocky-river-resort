import { Module } from '@nestjs/common'
import { ResendEmailProvider } from './resend-email.provider'
import { EMAIL_PROVIDER } from './email-provider.interface'

/**
 * EmailModule binds the EmailProvider token to the current implementation.
 *
 * To switch email vendors:
 *   1. Create MyNewProvider implements EmailProvider
 *   2. Change useClass below
 *   3. Zero other files change
 */
@Module({
  providers: [
    {
      provide:  EMAIL_PROVIDER,
      useClass: ResendEmailProvider,
    },
  ],
  exports: [EMAIL_PROVIDER],
})
export class EmailModule {}
