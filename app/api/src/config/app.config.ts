import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  throttle: {
    ttl: 60_000,
    limit: 100,
  },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
}))