//apps/api/src/modules/bookings/bookings.module.ts ===
import { Module } from '@nestjs/common'
import { BookingsController }  from './bookings.controller'
import { BookingsService }     from './bookings.service'
import { AvailabilityModule }  from '../availability/availability.module'
import { NotificationsModule } from '../notifications/notifications.module'

/**
 * BookingsModule — Phase 1 (no Redis, no BullMQ).
 *
 * Notifications are dispatched synchronously via Promise.allSettled()
 * inside BookingsService.dispatchNotifications() — fire and forget.
 *
 * Add BullMQ when: email p95 > 2s or booking volume > 50/day with
 * visible notification delays. See ARCHITECTURE.md Phase 2 criteria.
 */
@Module({
  imports:     [AvailabilityModule, NotificationsModule],
  controllers: [BookingsController],
  providers:   [BookingsService],
  exports:     [BookingsService],
})
export class BookingsModule {}
