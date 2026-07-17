"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const date_fns_1 = require("date-fns");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Email already in use');
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                role: 'guest',
            },
        });
        return this.issueTokens(user);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !user.passwordHash)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return this.issueTokens(user);
    }
    async refresh(rawToken) {
        const stored = await this.prisma.refreshToken.findUnique({ where: { token: rawToken } });
        if (!stored || stored.revoked || stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token invalid or expired');
        }
        await this.prisma.refreshToken.update({ where: { id: stored.id }, data: { revoked: true } });
        const user = await this.prisma.user.findUniqueOrThrow({ where: { id: stored.userId } });
        return this.issueTokens(user);
    }
    async logout(rawToken) {
        await this.prisma.refreshToken.updateMany({
            where: { token: rawToken },
            data: { revoked: true },
        });
    }
    async createPasswordResetToken(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3_600_000);
        await this.prisma.refreshToken.create({
            data: { token: `reset:${token}`, userId: user.id, expiresAt },
        });
        return {
            token,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
        };
    }
    async resetPassword(token, newPassword) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: `reset:${token}` },
        });
        if (!stored || stored.revoked || stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Reset token is invalid or has expired');
        }
        const passwordHash = await bcrypt.hash(newPassword, 12);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: stored.userId },
                data: { passwordHash },
            }),
            this.prisma.refreshToken.update({
                where: { id: stored.id },
                data: { revoked: true },
            }),
            this.prisma.refreshToken.updateMany({
                where: { userId: stored.userId, revoked: false },
                data: { revoked: true },
            }),
        ]);
        this.logger.log(`Password reset completed for user ${stored.userId}`);
    }
    async issueTokens(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.jwt.sign(payload, {
            secret: this.config.get('auth.jwtSecret'),
            expiresIn: this.config.get('auth.jwtAccessTtl'),
        });
        const rawRefresh = crypto.randomBytes(64).toString('hex');
        const ttl = this.config.get('auth.jwtRefreshTtl') ?? 604800;
        await this.prisma.refreshToken.create({
            data: {
                token: rawRefresh,
                userId: user.id,
                expiresAt: (0, date_fns_1.addSeconds)(new Date(), ttl),
            },
        });
        const { passwordHash: _, ...safeUser } = user;
        return { accessToken, refreshToken: rawRefresh, user: safeUser };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map