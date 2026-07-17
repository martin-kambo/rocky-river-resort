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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const availability_service_1 = require("./availability.service");
let AvailabilityController = class AvailabilityController {
    constructor(availability) {
        this.availability = availability;
    }
    check(slug, checkIn, checkOut, guests) {
        return this.availability.check(slug, checkIn, checkOut, Number(guests));
    }
    blockedDates(slug) {
        return this.availability.getBlockedDates(slug);
    }
};
exports.AvailabilityController = AvailabilityController;
__decorate([
    (0, common_1.Get)(':slug/availability'),
    (0, swagger_1.ApiOperation)({ summary: 'Check room availability and pricing for a date range' }),
    (0, swagger_1.ApiQuery)({ name: 'checkIn', example: '2026-07-12' }),
    (0, swagger_1.ApiQuery)({ name: 'checkOut', example: '2026-07-14' }),
    (0, swagger_1.ApiQuery)({ name: 'guests', example: 2 }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Query)('checkIn')),
    __param(2, (0, common_1.Query)('checkOut')),
    __param(3, (0, common_1.Query)('guests')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "check", null);
__decorate([
    (0, common_1.Get)(':slug/blocked-dates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get blocked dates for a room type' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AvailabilityController.prototype, "blockedDates", null);
exports.AvailabilityController = AvailabilityController = __decorate([
    (0, swagger_1.ApiTags)('rooms'),
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [availability_service_1.AvailabilityService])
], AvailabilityController);
//# sourceMappingURL=availability.controller.js.map