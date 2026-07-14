//apps/api/src/modules/auth/auth.service.ts ===
import {
  Injectable, ConflictException, UnauthorizedException, Logger,
} from '@nestjs/common'
import { JwtService }    from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../database/prisma.service'
import { RegisterDto }   from './dto/register.dto'
import { LoginDto }      from './dto/login.dto'
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import { addSeconds } from 'date-fns'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly prisma:  PrismaService,
    private readonly jwt:     JwtService,
    private readonly config:  ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (existing) throw new ConflictException('Email already in use')

    const passwordHash = await bcrypt.hash(dto.password, 12)
    const user = await this.prisma.user.create({
      data: {
        email:     dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName:  dto.lastName,
        phone:     dto.phone,
        role:      'guest',
      },
    })
    return this.issueTokens(user)
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(dto.password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    return this.issueTokens(user)
  }

  async refresh(rawToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({ where: { token: rawToken } })
    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token invalid or expired')
    }
    await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } })
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: stored.userId } })
    return this.issueTokens(user)
  }

  async logout(rawToken: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { token: rawToken },
      data:  { revoked: true },
    })
  }

  /**
   * Creates a password reset token stored in refresh_tokens with a "reset:" prefix.
   * Returns null silently when the email is not found — prevents enumeration.
   * Token expires in 1 hour.
   */
  async createPasswordResetToken(email: string): Promise<{
    token: string
    email: string
    name:  string
  } | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return null

    const token     = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3_600_000)

    await this.prisma.refreshToken.create({
      data: { token: `reset:${token}`, userId: user.id, expiresAt },
    })

    return {
      token,
      email: user.email,
      name:  `${user.firstName} ${user.lastName}`,
    }
  }

  /**
   * Validates the reset token, updates the password, and revokes all
   * existing sessions so the user must re-authenticate.
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: `reset:${token}` },
    })

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Reset token is invalid or has expired')
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: stored.userId },
        data:  { passwordHash },
      }),
      this.prisma.refreshToken.update({
        where: { id: stored.id },
        data:  { revoked: true },
      }),
      // Revoke all active sessions — password changed, re-auth required
      this.prisma.refreshToken.updateMany({
        where: { userId: stored.userId, revoked: false },
        data:  { revoked: true },
      }),
    ])

    this.logger.log(`Password reset completed for user ${stored.userId}`)
  }

  // ── private ─────────────────────────────────────────────────────────────────

  private async issueTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role }

    const accessToken = this.jwt.sign(payload, {
      secret:    this.config.get<string>('auth.jwtSecret'),
      expiresIn: this.config.get<number>('auth.jwtAccessTtl'),
    })

    const rawRefresh = crypto.randomBytes(64).toString('hex')
    const ttl        = this.config.get<number>('auth.jwtRefreshTtl') ?? 604800

    await this.prisma.refreshToken.create({
      data: {
        token:     rawRefresh,
        userId:    user.id,
        expiresAt: addSeconds(new Date(), ttl),
      },
    })

    const { passwordHash: _, ...safeUser } = user
    return { accessToken, refreshToken: rawRefresh, user: safeUser }
  }
}