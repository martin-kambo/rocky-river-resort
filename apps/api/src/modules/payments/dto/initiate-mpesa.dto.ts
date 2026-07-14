import { IsUUID, IsString, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class InitiateMpesaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsUUID()
  bookingId: string

  @ApiProperty({
    example: '+254712345678',
    description: 'Kenyan phone number: +2547XXXXXXXX, 07XXXXXXXX, or 2547XXXXXXXX',
  })
  @IsString()
  @Matches(
    /^(\+?254|0)[17]\d{8}$/,
    { message: 'Phone must be a valid Kenyan number (e.g. +254712345678 or 0712345678)' },
  )
  phone: string
}
EOF

cat "$REPO/apps/api/src/modules/payments/dto/initiate-mpesa.dto.ts"
Output

import { IsUUID, IsString, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class InitiateMpesaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @IsUUID()
  bookingId: string

  @ApiProperty({
    example: '+254712345678',
    description: 'Kenyan phone number: +2547XXXXXXXX, 07XXXXXXXX, or 2547XXXXXXXX',
  })
  @IsString()
  @Matches(
    /^(\+?254|0)[17]\d{8}$/,
    { message: 'Phone must be a valid Kenyan number (e.g. +254712345678 or 0712345678)' },
  )
  phone: string
}