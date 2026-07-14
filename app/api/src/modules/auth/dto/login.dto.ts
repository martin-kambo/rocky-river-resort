// apps/api/src/modules/auth/dto/login.dto.ts ===
import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'guest@rockyriverresort.co.ke' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'SecurePass123!', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string
}