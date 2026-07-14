import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth }    from '@nestjs/swagger'
import { UsersService }  from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard }  from '../auth/guards/jwt-auth.guard'
import { CurrentUser }   from '../../common/decorators/current-user.decorator'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  me(@CurrentUser() user: any) {
    return this.users.findById(user.id)
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update profile — firstName, lastName, phone, nationality, preferredLocale only' })
  update(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.users.update(user.id, dto)
  }
}