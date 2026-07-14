// apps/api/src/modules/admin/admin.controller.ts ===
import {
  Controller, Get, Patch, Post, Delete,
  Param, Body, UseGuards, Query,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard }         from '../auth/guards/jwt-auth.guard'
import { RolesGuard }           from '../../common/guards/roles.guard'
import { Roles }                from '../../common/decorators/roles.decorator'
import { AdminService }         from './admin.service'
import { AuthCleanupService }   from '../auth/auth-cleanup.service'
import { CreateSeasonalPricingDto } from './seasonal-pricing.dto'

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly admin:   AdminService,
    private readonly cleanup: AuthCleanupService,
  ) {}

  // ── Bookings ──────────────────────────────────────────────────────────────

  @Get('bookings')
  @ApiOperation({ summary: 'List all bookings (admin)' })
  listBookings(
    @Query('page')   page   = 1,
    @Query('limit')  limit  = 20,
    @Query('status') status?: string,
  ) {
    return this.admin.listBookings({ page: Number(page), limit: Number(limit), status })
  }

  @Get('bookings/stats')
  @ApiOperation({ summary: 'Booking stats for dashboard' })
  bookingStats() {
    return this.admin.bookingStats()
  }

  @Get('bookings/:id')
  @ApiOperation({ summary: 'Get booking detail (admin)' })
  getBooking(@Param('id') id: string) {
    return this.admin.getBooking(id)
  }

  @Patch('bookings/:id/status')
  @ApiOperation({ summary: 'Update booking status (admin)' })
  updateStatus(
    @Param('id')  id:   string,
    @Body()       body: { status: string },
  ) {
    return this.admin.updateBookingStatus(id, body.status as any)
  }

  // ── Rooms ─────────────────────────────────────────────────────────────────

  @Get('rooms')
  @ApiOperation({ summary: 'List all rooms with status (admin)' })
  listRooms() {
    return this.admin.listRooms()
  }

  @Patch('rooms/:id/status')
  @ApiOperation({ summary: 'Update room status (admin)' })
  updateRoomStatus(
    @Param('id')  id:   string,
    @Body()       body: { status: string; notes?: string },
  ) {
    return this.admin.updateRoomStatus(id, body.status as any, body.notes)
  }

  // ── Guests ────────────────────────────────────────────────────────────────

  @Get('guests')
  @ApiOperation({ summary: 'List all guests (admin)' })
  listGuests(
    @Query('page')  page  = 1,
    @Query('limit') limit = 20,
  ) {
    return this.admin.listGuests({ page: Number(page), limit: Number(limit) })
  }

  // ── Revenue report ────────────────────────────────────────────────────────

  @Get('reports/revenue')
  @ApiOperation({ summary: 'Revenue report by month (admin)' })
  revenueReport(@Query('year') year = new Date().getFullYear()) {
    return this.admin.revenueReport(Number(year))
  }

  // ── Seasonal pricing ──────────────────────────────────────────────────────

  @Get('seasonal-pricing')
  @ApiOperation({ summary: 'List all seasonal pricing rules' })
  listSeasonalPricing() {
    return this.admin.listSeasonalPricing()
  }

  @Post('seasonal-pricing')
  @ApiOperation({ summary: 'Create a seasonal pricing rule' })
  createSeasonalPricing(@Body() dto: CreateSeasonalPricingDto) {
    return this.admin.createSeasonalPricing(dto)
  }

  @Delete('seasonal-pricing/:id')
  @ApiOperation({ summary: 'Delete a seasonal pricing rule' })
  deleteSeasonalPricing(@Param('id') id: string) {
    return this.admin.deleteSeasonalPricing(id)
  }

  // ── Maintenance ───────────────────────────────────────────────────────────

  @Post('maintenance/cleanup-tokens')
  @ApiOperation({ summary: 'Purge expired and revoked refresh tokens (nightly cron)' })
  cleanupTokens() {
    return this.cleanup.purgeExpiredTokens()
  }
}