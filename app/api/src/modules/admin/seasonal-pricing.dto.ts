//apps/api/src/modules/admin/seasonal-pricing.dto.ts ===
import { IsString, IsDateString, IsNumber, Min, Max, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSeasonalPricingDto {
  @ApiProperty({ example: 'river-suite' })
  @IsString()
  roomTypeSlug: string

  @ApiProperty({ example: '2025-12-20' })
  @IsDateString()
  startDate: string

  @ApiProperty({ example: '2026-01-05' })
  @IsDateString()
  endDate: string

  @ApiProperty({ example: 1.5, description: 'Price multiplier — 1.5 = 50% premium' })
  @IsNumber()
  @Min(0.5)
  @Max(5)
  multiplier: number

  @ApiProperty({ example: 'Christmas & New Year', required: false })
  @IsOptional()
  @IsString()
  label?: string
}