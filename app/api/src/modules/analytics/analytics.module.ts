// apps/api/src/modules/analytics/analytics.module.ts ===
import { Module } from '@nestjs/common'
import { AnalyticsController } from './analytics.controller'
import { AnalyticsService }    from './analytics.service'

/**
 * AnalyticsModule — Phase 1: on-demand queries, no background jobs.
 *
 * Phase 2: add a Render Cron Job to pre-compute daily snapshots.
 */
@Module({
  controllers: [AnalyticsController],
  providers:   [AnalyticsService],
  exports:     [AnalyticsService],
})
export class AnalyticsModule {}