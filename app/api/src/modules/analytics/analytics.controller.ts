//apps/api/src/modules/analytics/analytics.controller.ts ===
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AnalyticsService } from './analytics.service'
import { JwtAuthGuard }     from '../auth/guards/jwt-auth.guard'
import { RolesGuard }       from '../../common/guards/roles.guard'
import { Roles }            from '../../common/decorators/roles.decorator'

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Dashboard stats (admin)' })
  stats() {
    return this.analytics.getDashboardStats()
  }

  @Get('occupancy')
  @ApiOperation({ summary: '30-day occupancy trend (admin)' })
  occupancy(@Query('days') days = 30) {
    return this.analytics.getOccupancyTrend(Number(days))
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Revenue by month (admin)' })
  revenue(@Query('year') year = new Date().getFullYear()) {
    return this.analytics.getRevenueByMonth(Number(year))
  }

  @Get('top-rooms')
  @ApiOperation({ summary: 'Top room types by bookings (admin)' })
  topRooms() {
    return this.analytics.getTopRoomTypes()
  }
}
