"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaInfraModule = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_media_provider_1 = require("./cloudinary-media.provider");
const media_provider_interface_1 = require("./media-provider.interface");
let MediaInfraModule = class MediaInfraModule {
};
exports.MediaInfraModule = MediaInfraModule;
exports.MediaInfraModule = MediaInfraModule = __decorate([
    (0, common_1.Module)({
        providers: [
            { provide: media_provider_interface_1.MEDIA_PROVIDER, useClass: cloudinary_media_provider_1.CloudinaryMediaProvider },
        ],
        exports: [media_provider_interface_1.MEDIA_PROVIDER],
    })
], MediaInfraModule);
//# sourceMappingURL=media.module.js.map