//apps/api/src/modules/auth/auth.controller.ts ===
import {
  Body, Controller, Post, HttpCode, HttpStatus,
  Get, UseGuards, Req,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { Request } from 'express'
import { AuthService }          from './auth.service'
import { NotificationsService } from '../notifications/notifications.service'
import { JwtAuthGuard }         from './guards/jwt-auth.guard'
import { CurrentUser }          from '../../common/decorators/current-user.decorator'
import { RegisterDto }          from './dto/register.dto'
import { LoginDto }             from './dto/login.dto'
import { RefreshDto }           from './dto/refresh.dto'
import { ForgotPasswordDto }    from './dto/forgot-password.dto'
import { ResetPasswordDto }     from './dto/reset-password.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth:          AuthService,
    private readonly notifications: NotificationsService,
  ) {}

  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Register a new guest account' })
  async register(@Body() dto: RegisterDto) {
    const result = await this.auth.register(dto)
    // Welcome email — fire and forget
    this.notifications
      .sendWelcome(result.user.email, result.user.firstName)
      .catch(() => {})
    return result
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Login — returns JWT + refresh token' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token' })
  refresh(@Body() dto: RefreshDto) {
    return this.auth.refresh(dto.refreshToken)
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke refresh token' })
  logout(@Body() dto: RefreshDto) {
    return this.auth.logout(dto.refreshToken)
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user profile from token' })
  me(@CurrentUser() user: any) {
    const { passwordHash: _pw, ...safe } = user
    return safe
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @ApiOperation({ summary: 'Request a password reset link via email' })
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Req()  req: Request,
  ) {
    const frontendBase = process.env.NEXT_PUBLIC_BASE_URL
      ?? `${req.protocol}://${req.get('host')}`

    // createPasswordResetToken returns null silently when email not found
    const tokenData = await this.auth.createPasswordResetToken(dto.email)
    if (!tokenData) return

    const resetUrl = `${frontendBase}/reset-password?token=${tokenData.token}`

    // Fire and forget — never block the response
    this.notifications
      .sendPasswordReset(tokenData.email, tokenData.name, resetUrl)
      .catch(() => {})
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Complete password reset with token + new password' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.auth.resetPassword(dto.token, dto.password)
  }
}