import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation }  from '@nestjs/swagger'
import { RoomsService }           from './rooms.service'

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly rooms: RoomsService) {}

  @Get()
  @ApiOperation({ summary: 'List all active room types' })
  findAll() {
    return this.rooms.findAll()
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a room type by slug' })
  findOne(@Param('slug') slug: string) {
    return this.rooms.findBySlug(slug)
  }
}