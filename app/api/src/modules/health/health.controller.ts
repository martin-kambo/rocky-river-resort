// apps/api/src/modules/health/health.controller.ts ===
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { PrismaService } from '../../database/prisma.service'

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Health check — returns API and database status' })
  async check() {
    let dbStatus = 'ok'
    try {
      await this.prisma.$queryRaw`SELECT 1`
    } catch {
      dbStatus = 'error'
    }

    return {
      status:    dbStatus === 'ok' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api:      'ok',
        database: dbStatus,
      },
      version: process.env.npm_package_version ?? '1.0.0',
    }
  }
}