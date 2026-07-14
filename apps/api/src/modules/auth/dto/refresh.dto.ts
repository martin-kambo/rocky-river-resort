//apps/api/src/modules/auth/dto/refresh.dto.ts ===
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshDto {
  @ApiProperty({ description: 'Refresh token received at login' })
  @IsString()
  refreshToken: string
}