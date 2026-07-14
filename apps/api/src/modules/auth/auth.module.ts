//apps/api/src/modules/auth/auth.module.ts ===
import { Module }              from '@nestjs/common'
import { JwtModule }           from '@nestjs/jwt'
import { PassportModule }      from '@nestjs/passport'
import { AuthController }      from './auth.controller'
import { AuthService }         from './auth.service'
import { AuthCleanupService }  from './auth-cleanup.service'
import { JwtStrategy }         from './strategies/jwt.strategy'
import { JwtAuthGuard }        from './guards/jwt-auth.guard'
import { NotificationsModule } from '../notifications/notifications.module'

@Module({
  imports:     [PassportModule, JwtModule.register({}), NotificationsModule],
  controllers: [AuthController],
  providers:   [AuthService, AuthCleanupService, JwtStrategy, JwtAuthGuard],
  exports:     [AuthService, AuthCleanupService, JwtAuthGuard],
})
export class AuthModule {}