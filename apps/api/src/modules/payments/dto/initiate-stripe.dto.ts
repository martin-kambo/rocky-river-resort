import { IsUUID, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class InitiateStripeDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsUUID()
  bookingId: string

  @ApiProperty({ enum: ['KES', 'USD'], example: 'KES' })
  @IsEnum(['KES', 'USD'])
  currency: 'KES' | 'USD'
}
