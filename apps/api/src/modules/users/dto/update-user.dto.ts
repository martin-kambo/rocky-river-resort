import { IsString, IsOptional, IsEnum, MaxLength, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @ApiProperty({ example: 'Amara', required: false })
  @IsOptional() @IsString() @MaxLength(100)
  firstName?: string

  @ApiProperty({ example: 'Ochieng', required: false })
  @IsOptional() @IsString() @MaxLength(100)
  lastName?: string

  @ApiProperty({ example: '+254712345678', required: false })
  @IsOptional() @IsString()
  @Matches(/^(\+?254|0)[17]\d{8}$/, { message: 'Phone must be a valid Kenyan number' })
  phone?: string

  @ApiProperty({ example: 'KEN', required: false })
  @IsOptional() @IsString() @MaxLength(3)
  nationality?: string

  @ApiProperty({ enum: ['en', 'sw'], required: false })
  @IsOptional() @IsEnum(['en', 'sw'])
  preferredLocale?: string
  // role, email, passwordHash NOT in this DTO — cannot be changed via this endpoint
}