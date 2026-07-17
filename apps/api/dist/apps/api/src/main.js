"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'production'
            ? ['error', 'warn', 'log']
            : ['error', 'warn', 'log', 'debug'],
        rawBody: true,
    });
    app.use((0, helmet_1.default)({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: process.env.NODE_ENV === 'production'
            ? undefined
            : false,
    }));
    app.use('/api/v1/payments/webhook/stripe', express.raw({ type: 'application/json' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    const origins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000').split(',');
    app.enableCors({
        origin: origins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        stopAtFirstError: false,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    if (process.env.NODE_ENV !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Rocky River Resort API')
            .setDescription('REST API for Rocky River Resort — rooms, bookings, payments')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .addTag('auth', 'Authentication and session management')
            .addTag('rooms', 'Room types, availability and blocked dates')
            .addTag('bookings', 'Booking creation, management and cancellation')
            .addTag('payments', 'Stripe and M-Pesa payment processing')
            .addTag('users', 'Guest profile management')
            .addTag('admin', 'Admin-only management endpoints')
            .addTag('analytics', 'Revenue and occupancy reporting')
            .addTag('media', 'Image upload via Cloudinary')
            .addTag('health', 'Health check')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: { persistAuthorization: true },
        });
        logger.log('📖 Swagger docs → http://localhost:4000/api/docs');
    }
    const port = parseInt(process.env.PORT ?? '4000', 10);
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 API running → http://localhost:${port}/api/v1`);
    logger.log(`🏥 Health      → http://localhost:${port}/api/v1/health`);
}
bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map