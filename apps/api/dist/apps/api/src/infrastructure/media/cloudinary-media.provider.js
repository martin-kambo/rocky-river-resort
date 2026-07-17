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
var CloudinaryMediaProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryMediaProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let CloudinaryMediaProvider = CloudinaryMediaProvider_1 = class CloudinaryMediaProvider {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(CloudinaryMediaProvider_1.name);
        this.cloudName = config.get('CLOUDINARY_CLOUD_NAME', '');
        cloudinary_1.v2.config({
            cloud_name: this.cloudName,
            api_key: config.get('CLOUDINARY_API_KEY', ''),
            api_secret: config.get('CLOUDINARY_API_SECRET', ''),
            secure: true,
        });
        if (!this.cloudName) {
            this.logger.warn('CLOUDINARY_CLOUD_NAME not set — media uploads will fail');
        }
    }
    async upload(buffer, options) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder: `rocky-river-resort/${options.folder}`,
                public_id: options.publicId,
                tags: options.tags ?? [],
                overwrite: true,
                resource_type: 'image',
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' },
                ],
            }, (error, result) => {
                if (error || !result)
                    return reject(error ?? new Error('Upload failed'));
                resolve({
                    publicId: result.public_id,
                    url: result.url,
                    secureUrl: result.secure_url,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                    bytes: result.bytes,
                });
            });
            stream_1.Readable.from(buffer).pipe(stream);
        });
    }
    async delete(publicId) {
        await cloudinary_1.v2.uploader.destroy(publicId);
        this.logger.log(`Deleted media: ${publicId}`);
    }
    buildUrl(publicId, transforms = {}) {
        const t = {
            quality: transforms.quality ?? 'auto',
            fetch_format: transforms.format ?? 'auto',
        };
        if (transforms.width)
            t.width = transforms.width;
        if (transforms.height)
            t.height = transforms.height;
        if (transforms.crop)
            t.crop = transforms.crop;
        if (transforms.gravity)
            t.gravity = transforms.gravity;
        return cloudinary_1.v2.url(publicId, { transformation: [t], secure: true });
    }
    thumbnail(publicId) {
        return this.buildUrl(publicId, {
            width: 200, height: 200, crop: 'thumb', gravity: 'auto',
        });
    }
    hero(publicId) {
        return this.buildUrl(publicId, {
            width: 1200, height: 800, crop: 'fill', gravity: 'auto',
        });
    }
};
exports.CloudinaryMediaProvider = CloudinaryMediaProvider;
exports.CloudinaryMediaProvider = CloudinaryMediaProvider = CloudinaryMediaProvider_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryMediaProvider);
//# sourceMappingURL=cloudinary-media.provider.js.map