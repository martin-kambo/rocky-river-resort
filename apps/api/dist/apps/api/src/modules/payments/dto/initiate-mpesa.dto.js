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
exports.InitiateMpesaDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class InitiateMpesaDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { bookingId: { required: true, type: () => String, format: "uuid" }, phone: { required: true, type: () => String, pattern: "^(\\+?254|0)[17]\\d{8}$" } };
    }
}
exports.InitiateMpesaDto = InitiateMpesaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], InitiateMpesaDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+254712345678',
        description: 'Kenyan phone number: +2547XXXXXXXX, 07XXXXXXXX, or 2547XXXXXXXX',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(\+?254|0)[17]\d{8}$/, { message: 'Phone must be a valid Kenyan number (e.g. +254712345678 or 0712345678)' }),
    __metadata("design:type", String)
], InitiateMpesaDto.prototype, "phone", void 0);
//# sourceMappingURL=initiate-mpesa.dto.js.map