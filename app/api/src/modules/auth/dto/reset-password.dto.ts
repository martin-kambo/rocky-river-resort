// apps/api/src/modules/auth/dto/reset-password.dto.ts ===
import { IsString, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordDto {
  @ApiProperty({ description: 'Reset token from the password reset email' })
  @IsString()
  token: string

  @ApiProperty({ example: 'NewSecurePass123!', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string
}