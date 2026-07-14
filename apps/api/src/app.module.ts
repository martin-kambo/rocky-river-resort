import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { ConfigModule }       from '@nestjs/config'
import { ThrottlerModule }    from '@nestjs/throttler'
import { DatabaseModule }     from './database/database.module'
import { AuthModule }         from './modules/auth/auth.module'
import { UsersModule }        from './modules/users/users.module'
import { RoomsModule }        from './modules/rooms/rooms.module'
import { BookingsModule }     from './modules/bookings/bookings.module'
import { PaymentsModule }     from './modules/payments/payments.module'
import { AvailabilityModule } from './modules/availability/availability.module'
import { NotificationsModule }from './modules/notifications/notifications.module'
import { AnalyticsModule }    from './modules/analytics/analytics.module'
import { HealthModule }       from './modules/health/health.module'
import { AdminModule }        from './modules/admin/admin.module'
import { MediaModule }        from './modules/media/media.module'
import { LoggerMiddleware }   from './common/middleware/logger.middleware'
import { RawBodyMiddleware }  from './common/middleware/raw-body.middleware'
import appConfig      from './config/app.config'
import databaseConfig from './config/database.config'
import authConfig     from './config/auth.config'
import paymentConfig  from './config/payment.config'

@Module({
  imports: [
    // Config — global, loaded once
    ConfigModule.forRoot({
      isGlobal: true,
      load:     [appConfig, databaseConfig, authConfig, paymentConfig],
    }),

    // Rate limiting — 100 requests per 60 seconds per IP
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    // Infrastructure
    DatabaseModule,

    // Feature modules
    HealthModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    BookingsModule,
    PaymentsModule,
    AvailabilityModule,
    NotificationsModule,
    AnalyticsModule,
    AdminModule,
    MediaModule,

    // Phase 2: add BullMQ, ScheduleModule, CacheModule here when metrics justify
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
    consumer.apply(RawBodyMiddleware).forRoutes('payments/webhook/stripe')
  }
}