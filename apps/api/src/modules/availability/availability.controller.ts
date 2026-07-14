// apps/api/src/modules/availability/availability.controller.ts ===
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { AvailabilityService } from './availability.service'

@ApiTags('rooms')
@Controller('rooms')
export class AvailabilityController {
  constructor(private readonly availability: AvailabilityService) {}

  @Get(':slug/availability')
  @ApiOperation({ summary: 'Check room availability and pricing for a date range' })
  @ApiQuery({ name: 'checkIn',  example: '2026-07-12' })
  @ApiQuery({ name: 'checkOut', example: '2026-07-14' })
  @ApiQuery({ name: 'guests',   example: 2 })
  check(
    @Param('slug')       slug:     string,
    @Query('checkIn')    checkIn:  string,
    @Query('checkOut')   checkOut: string,
    @Query('guests')     guests:   number,
  ) {
    return this.availability.check(slug, checkIn, checkOut, Number(guests))
  }

  @Get(':slug/blocked-dates')
  @ApiOperation({ summary: 'Get blocked dates for a room type' })
  blockedDates(@Param('slug') slug: string) {
    return this.availability.getBlockedDates(slug)
  }
}