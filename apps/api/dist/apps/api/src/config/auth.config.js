"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth', () => ({
    jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-in-prod',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret',
    jwtAccessTtl: parseInt(process.env.JWT_ACCESS_TTL ?? '900', 10),
    jwtRefreshTtl: parseInt(process.env.JWT_REFRESH_TTL ?? '604800', 10),
}));
//# sourceMappingURL=auth.config.js.map