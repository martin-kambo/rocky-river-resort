//apps/api/src/modules/auth/auth-cleanup.service.ts ===
import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../database/prisma.service'

/**
 * AuthCleanupService — purges expired and revoked refresh tokens.
 *
 * Run via:
 *   POST /admin/maintenance/cleanup-tokens (admin JWT required)
 *   Render Cron Job: schedule nightly at 3 AM
 *
 * Without this the refresh_tokens table grows unbounded.
 * At 1,000 monthly-active users logging in once a month: ~12,000 rows/year.
 * At 50,000 users: ~600,000 rows/year — becomes a performance issue.
 *
 * Phase 2: add @nestjs/schedule and run @Cron('0 3 * * *') here.
 */
@Injectable()
export class AuthCleanupService {
  private readonly logger = new Logger(AuthCleanupService.name)

  constructor(private readonly prisma: PrismaService) {}

  async purgeExpiredTokens(): Promise<{ deleted: number }> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } }, // expired
          { revoked: true },                  // revoked
        ],
      },
    })

    this.logger.log(`Purged ${result.count} expired/revoked tokens`)
    return { deleted: result.count }
  }
}