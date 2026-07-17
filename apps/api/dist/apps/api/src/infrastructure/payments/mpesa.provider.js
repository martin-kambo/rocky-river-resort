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
var MpesaProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpesaProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let MpesaProvider = MpesaProvider_1 = class MpesaProvider {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(MpesaProvider_1.name);
        const env = config.get('payment.mpesa.environment', 'sandbox');
        this.baseUrl = env === 'production'
            ? 'https://api.safaricom.co.ke'
            : 'https://sandbox.safaricom.co.ke';
    }
    async initiateStk(params) {
        const token = await this.getAccessToken();
        const shortcode = this.config.get('payment.mpesa.shortcode');
        const passkey = this.config.get('payment.mpesa.passkey');
        const callback = this.config.get('payment.mpesa.callbackUrl');
        const timestamp = new Date()
            .toISOString()
            .replace(/[^0-9]/g, '')
            .slice(0, 14);
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
        const phone = params.phone.replace(/^0/, '254').replace(/^\+/, '');
        const { data } = await axios_1.default.post(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: params.amount,
            PartyA: phone,
            PartyB: shortcode,
            PhoneNumber: phone,
            CallBackURL: callback,
            AccountReference: params.accountRef,
            TransactionDesc: params.description,
        }, { headers: { Authorization: `Bearer ${token}` } });
        return {
            checkoutRequestId: data.CheckoutRequestID,
            merchantRequestId: data.MerchantRequestID,
            customerMessage: data.CustomerMessage,
            raw: data,
        };
    }
    async getAccessToken() {
        const key = this.config.get('payment.mpesa.consumerKey');
        const secret = this.config.get('payment.mpesa.consumerSecret');
        const cred = Buffer.from(`${key}:${secret}`).toString('base64');
        const { data } = await axios_1.default.get(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, { headers: { Authorization: `Basic ${cred}` } });
        return data.access_token;
    }
};
exports.MpesaProvider = MpesaProvider;
exports.MpesaProvider = MpesaProvider = MpesaProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MpesaProvider);
//# sourceMappingURL=mpesa.provider.js.map