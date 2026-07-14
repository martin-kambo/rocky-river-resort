// apps/api/src/modules/auth/dto/register.dto.ts ===
import {
  IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({ example: 'amara@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'SecurePass123!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string

  @ApiProperty({ example: 'Amara' })
  @IsString()
  @MaxLength(100)
  firstName: string

  @ApiProperty({ example: 'Ochieng' })
  @IsString()
  @MaxLength(100)
  lastName: string

  @ApiProperty({ example: '+254712345678', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^(\+?254|0)[17]\d{8}$/, {
    message: 'Phone must be a valid Kenyan number (e.g. +254712345678)',
  })
  phone?: string
}