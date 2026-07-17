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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeasonalPricingDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSeasonalPricingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { roomTypeSlug: { required: true, type: () => String }, startDate: { required: true, type: () => String }, endDate: { required: true, type: () => String }, multiplier: { required: true, type: () => Number, minimum: 0.5, maximum: 5 }, label: { required: false, type: () => String } };
    }
}
exports.CreateSeasonalPricingDto = CreateSeasonalPricingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'river-suite' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSeasonalPricingDto.prototype, "roomTypeSlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-12-20' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSeasonalPricingDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-05' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSeasonalPricingDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5, description: 'Price multiplier — 1.5 = 50% premium' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.5),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateSeasonalPricingDto.prototype, "multiplier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Christmas & New Year', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSeasonalPricingDto.prototype, "label", void 0);
//# sourceMappingURL=seasonal-pricing.dto.js.map