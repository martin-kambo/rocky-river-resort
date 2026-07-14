import { Test, TestingModule }   from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule }     from '../src/app.module'
import { PrismaService } from '../src/database/prisma.service'

describe('Rocky River Resort API (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let authToken: string
  let userId: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.setGlobalPrefix('api')
    app.enableVersioning()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
    prisma = app.get<PrismaService>(PrismaService)
  })

  afterAll(async () => {
    if (userId) {
      await prisma.user.delete({ where: { id: userId } }).catch(() => {})
    }
    await app.close()
  })

  describe('POST /api/v1/auth/register', () => {
    it('registers a new user and returns tokens', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'e2e@rockyriverresort.co.ke', password: 'TestPass123!', firstName: 'E2E', lastName: 'Test' })
        .expect(201)
      expect(res.body.data).toHaveProperty('accessToken')
      expect(res.body.data.user.email).toBe('e2e@rockyriverresort.co.ke')
      expect(res.body.data.user).not.toHaveProperty('passwordHash')
      authToken = res.body.data.accessToken
      userId    = res.body.data.user.id
    })

    it('rejects duplicate email with 409', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'e2e@rockyriverresort.co.ke', password: 'TestPass123!', firstName: 'E2E', lastName: 'Test' })
        .expect(409)
    })

    it('rejects invalid email format with 400', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email: 'not-an-email', password: 'TestPass123!', firstName: 'A', lastName: 'B' })
        .expect(400)
    })
  })

  describe('POST /api/v1/auth/login', () => {
    it('returns tokens for correct credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'e2e@rockyriverresort.co.ke', password: 'TestPass123!' })
        .expect(200)
      expect(res.body.data).toHaveProperty('accessToken')
    })

    it('rejects wrong password with 401', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'e2e@rockyriverresort.co.ke', password: 'WrongPassword' })
        .expect(401)
    })
  })

  describe('GET /api/v1/rooms', () => {
    it('returns array of room types', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/rooms').expect(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe('GET /api/v1/users/me', () => {
    it('returns profile for authenticated user', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
      expect(res.body.data.email).toBe('e2e@rockyriverresort.co.ke')
      expect(res.body.data).not.toHaveProperty('passwordHash')
    })

    it('returns 401 without token', () => {
      return request(app.getHttpServer()).get('/api/v1/users/me').expect(401)
    })
  })

  describe('GET /api/v1/health', () => {
    it('returns status ok', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/health').expect(200)
      expect(res.body.data.status).toBe('ok')
    })
  })
})