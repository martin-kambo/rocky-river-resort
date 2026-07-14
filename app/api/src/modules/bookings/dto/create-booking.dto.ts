// apps/api/src/modules/bookings/dto/create-booking.dto.ts ===
import {
  IsString, IsDateString, IsInt, Min, Max, IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBookingDto {
  @ApiProperty({ example: 'river-suite' })
  @IsString()
  roomTypeSlug: string

  @ApiProperty({ example: '2026-07-12' })
  @IsDateString()
  checkIn: string

  @ApiProperty({ example: '2026-07-14' })
  @IsDateString()
  checkOut: string

  @ApiProperty({ example: 2, minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1)
  @Max(10)
  adults: number

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(8)
  children?: number

  @ApiProperty({ example: 'Early check-in if possible', required: false })
  @IsOptional()
  @IsString()
  specialRequests?: string
}