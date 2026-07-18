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
exports.AdminController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const admin_service_1 = require("./admin.service");
const auth_cleanup_service_1 = require("../auth/auth-cleanup.service");
const seasonal_pricing_dto_1 = require("./seasonal-pricing.dto");
let AdminController = class AdminController {
    constructor(admin, cleanup) {
        this.admin = admin;
        this.cleanup = cleanup;
    }
    listBookings(page = 1, limit = 20, status) {
        return this.admin.listBookings({ page: Number(page), limit: Number(limit), status });
    }
    bookingStats() {
        return this.admin.bookingStats();
    }
    getBooking(id) {
        return this.admin.getBooking(id);
    }
    updateStatus(id, body) {
        return this.admin.updateBookingStatus(id, body.status);
    }
    listRooms() {
        return this.admin.listRooms();
    }
    updateRoomStatus(id, body) {
        return this.admin.updateRoomStatus(id, body.status, body.notes);
    }
    listGuests(page = 1, limit = 20) {
        return this.admin.listGuests({ page: Number(page), limit: Number(limit) });
    }
    revenueReport(year = new Date().getFullYear()) {
        return this.admin.revenueReport(Number(year));
    }
    listSeasonalPricing() {
        return this.admin.listSeasonalPricing();
    }
    createSeasonalPricing(dto) {
        return this.admin.createSeasonalPricing(dto);
    }
    deleteSeasonalPricing(id) {
        return this.admin.deleteSeasonalPricing(id);
    }
    cleanupTokens() {
        return this.cleanup.purgeExpiredTokens();
    }
};
exports.AdminController = AdminController;
__decorate([
    openapi.ApiQuery({ name: "page", required: false }),
    openapi.ApiQuery({ name: "limit", required: false }),
    openapi.ApiQuery({ name: "status", required: false }),
    (0, common_1.Get)('bookings'),
    (0, swagger_1.ApiOperation)({ summary: 'List all bookings (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listBookings", null);
__decorate([
    (0, common_1.Get)('bookings/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Booking stats for dashboard' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "bookingStats", null);
__decorate([
    (0, common_1.Get)('bookings/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get booking detail (admin)' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getBooking", null);
__decorate([
    (0, common_1.Patch)('bookings/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update booking status (admin)' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('rooms'),
    (0, swagger_1.ApiOperation)({ summary: 'List all rooms with status (admin)' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listRooms", null);
__decorate([
    (0, common_1.Patch)('rooms/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update room status (admin)' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateRoomStatus", null);
__decorate([
    openapi.ApiQuery({ name: "page", required: false }),
    openapi.ApiQuery({ name: "limit", required: false }),
    (0, common_1.Get)('guests'),
    (0, swagger_1.ApiOperation)({ summary: 'List all guests (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listGuests", null);
__decorate([
    openapi.ApiQuery({ name: "year", required: false }),
    (0, common_1.Get)('reports/revenue'),
    (0, swagger_1.ApiOperation)({ summary: 'Revenue report by month (admin)' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "revenueReport", null);
__decorate([
    (0, common_1.Get)('seasonal-pricing'),
    (0, swagger_1.ApiOperation)({ summary: 'List all seasonal pricing rules' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "listSeasonalPricing", null);
__decorate([
    (0, common_1.Post)('seasonal-pricing'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a seasonal pricing rule' }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [seasonal_pricing_dto_1.CreateSeasonalPricingDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createSeasonalPricing", null);
__decorate([
    (0, common_1.Delete)('seasonal-pricing/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a seasonal pricing rule' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteSeasonalPricing", null);
__decorate([
    (0, common_1.Post)('maintenance/cleanup-tokens'),
    (0, swagger_1.ApiOperation)({ summary: 'Purge expired and revoked refresh tokens (nightly cron)' }),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "cleanupTokens", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        auth_cleanup_service_1.AuthCleanupService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map