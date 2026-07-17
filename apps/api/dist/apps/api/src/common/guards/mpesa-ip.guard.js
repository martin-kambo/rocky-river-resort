"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MpesaIpGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpesaIpGuard = void 0;
const common_1 = require("@nestjs/common");
let MpesaIpGuard = MpesaIpGuard_1 = class MpesaIpGuard {
    constructor() {
        this.logger = new common_1.Logger(MpesaIpGuard_1.name);
    }
    canActivate(context) {
        if (process.env.MPESA_ENVIRONMENT !== 'production') {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const forwarded = req.headers['x-forwarded-for'];
        const ip = forwarded
            ? forwarded.split(',')[0].trim()
            : req.ip ?? req.connection?.remoteAddress ?? '';
        if (!MpesaIpGuard_1.SAFARICOM_IPS.has(ip)) {
            this.logger.warn(`M-Pesa callback rejected from unauthorized IP: ${ip}`);
            throw new common_1.ForbiddenException('Unauthorized callback source');
        }
        this.logger.log(`M-Pesa callback accepted from ${ip}`);
        return true;
    }
};
exports.MpesaIpGuard = MpesaIpGuard;
MpesaIpGuard.SAFARICOM_IPS = new Set([
    '196.201.214.200',
    '196.201.214.206',
    '196.201.213.114',
    '196.201.214.207',
    '196.201.214.208',
    '196.201.213.44',
    '196.201.212.127',
    '196.201.212.138',
    '196.201.212.129',
    '196.201.212.136',
    '196.201.212.74',
    '196.201.212.69',
]);
exports.MpesaIpGuard = MpesaIpGuard = MpesaIpGuard_1 = __decorate([
    (0, common_1.Injectable)()
], MpesaIpGuard);
//# sourceMappingURL=mpesa-ip.guard.js.map