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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const media_provider_interface_1 = require("../../infrastructure/media/media-provider.interface");
const utils_1 = require("@rrr/utils");
let MediaService = class MediaService {
    constructor(prisma, media) {
        this.prisma = prisma;
        this.media = media;
    }
    async uploadRoomImage(roomTypeSlug, buffer, filename) {
        const roomType = await this.prisma.roomType.findUnique({
            where: { slug: roomTypeSlug },
            include: { images: true },
        });
        if (!roomType)
            throw new common_1.NotFoundException(`Room type '${roomTypeSlug}' not found`);
        const baseName = filename.replace(/\.[^.]+$/, '');
        const publicId = `${roomTypeSlug}/${(0, utils_1.slugify)(baseName)}-${Date.now()}`;
        const result = await this.media.upload(buffer, {
            folder: 'rooms',
            publicId,
            tags: ['room', roomTypeSlug],
        });
        const isHero = roomType.images.length === 0;
        const image = await this.prisma.roomImage.create({
            data: {
                roomTypeId: roomType.id,
                url: result.secureUrl,
                altEn: `${roomType.nameEn} — ${baseName}`,
                altSw: `${roomType.nameSw} — ${baseName}`,
                sortOrder: roomType.images.length,
                isHero,
            },
        });
        return {
            image,
            cdn: {
                original: result.secureUrl,
                hero: this.media.hero(result.publicId),
                thumbnail: this.media.thumbnail(result.publicId),
            },
        };
    }
    async delete(publicId) {
        await this.media.delete(publicId);
        return { deleted: true, publicId };
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(media_provider_interface_1.MEDIA_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], MediaService);
//# sourceMappingURL=media.service.js.map