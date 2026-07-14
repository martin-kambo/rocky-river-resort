// apps/api/src/modules/bookings/bookings.controller.ts ===
import {
  Controller, Get, Post, Patch, Param, Body, UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BookingsService }  from './bookings.service'
import { CreateBookingDto } from './dto/create-booking.dto'
import { JwtAuthGuard }     from '../auth/guards/jwt-auth.guard'
import { CurrentUser }      from '../../common/decorators/current-user.decorator'

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookings: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user: any) {
    return this.bookings.create(dto, user)
  }

  @Get()
  @ApiOperation({ summary: 'List all bookings for the current user' })
  findAll(@CurrentUser() user: any) {
    return this.bookings.findByUser(user.id)
  }

  @Get('ref/:ref')
  @ApiOperation({ summary: 'Get a booking by reference number' })
  findByRef(@Param('ref') ref: string, @CurrentUser() user: any) {
    return this.bookings.findByReference(ref, user.id)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookings.findOne(id, user.id)
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a booking (48h policy applied)' })
  cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookings.cancel(id, user.id)
  }
}