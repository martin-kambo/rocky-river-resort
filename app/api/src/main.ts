import { NestFactory }        from '@nestjs/core'
import {
  ValidationPipe, VersioningType, Logger,
} from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { NestExpressApplication }         from '@nestjs/platform-express'
import * as express                        from 'express'
import helmet                              from 'helmet'
import { AppModule }             from './app.module'
import { HttpExceptionFilter }   from './common/filters/http-exception.filter'
import { TransformInterceptor }  from './common/interceptors/transform.interceptor'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app    = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'debug'],
    // rawBody must be true to support Stripe webhook signature verification
    rawBody: true,
  })

  // ── Security ──────────────────────────────────────────────────────────────
  app.use(helmet({
    crossOriginEmbedderPolicy: false, // allow Swagger UI fonts
    contentSecurityPolicy: process.env.NODE_ENV === 'production'
      ? undefined
      : false, // relax CSP in dev for Swagger
  }))

  // ── Body parsing ─────────────────────────────────────────────────────────
  // Stripe webhooks need raw body — this is handled by the rawBody: true option
  // above combined with the RawBodyMiddleware. Standard JSON parsing is applied
  // globally except on the webhook route.
  app.use('/api/v1/payments/webhook/stripe',
    express.raw({ type: 'application/json' })
  )
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))

  // ── CORS ──────────────────────────────────────────────────────────────────
  const origins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000').split(',')
  app.enableCors({
    origin:      origins,
    credentials: true,
    methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })

  // ── Global prefix and versioning ─────────────────────────────────────────
  app.setGlobalPrefix('api')
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

  // ── Global pipes, filters, interceptors ──────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:             true,
      forbidNonWhitelisted:  true,
      transform:             true,
      transformOptions:      { enableImplicitConversion: true },
      stopAtFirstError:      false,
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  // ── Swagger (development only) ────────────────────────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Rocky River Resort API')
      .setDescription('REST API for Rocky River Resort — rooms, bookings, payments')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .addTag('auth',      'Authentication and session management')
      .addTag('rooms',     'Room types, availability and blocked dates')
      .addTag('bookings',  'Booking creation, management and cancellation')
      .addTag('payments',  'Stripe and M-Pesa payment processing')
      .addTag('users',     'Guest profile management')
      .addTag('admin',     'Admin-only management endpoints')
      .addTag('analytics', 'Revenue and occupancy reporting')
      .addTag('media',     'Image upload via Cloudinary')
      .addTag('health',    'Health check')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    })
    logger.log('📖 Swagger docs → http://localhost:4000/api/docs')
  }

  // ── Start ─────────────────────────────────────────────────────────────────
  const port = parseInt(process.env.PORT ?? '4000', 10)
  await app.listen(port, '0.0.0.0')
  logger.log(`🚀 API running → http://localhost:${port}/api/v1`)
  logger.log(`🏥 Health      → http://localhost:${port}/api/v1/health`)
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err)
  process.exit(1)
})