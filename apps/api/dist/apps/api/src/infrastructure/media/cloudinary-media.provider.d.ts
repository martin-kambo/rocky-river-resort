import { ConfigService } from '@nestjs/config';
import type { MediaProvider, UploadResult, TransformOptions } from './media-provider.interface';
export declare class CloudinaryMediaProvider implements MediaProvider {
    private readonly config;
    private readonly logger;
    private readonly cloudName;
    constructor(config: ConfigService);
    upload(buffer: Buffer, options: {
        folder: string;
        publicId?: string;
        tags?: string[];
    }): Promise<UploadResult>;
    delete(publicId: string): Promise<void>;
    buildUrl(publicId: string, transforms?: TransformOptions): string;
    thumbnail(publicId: string): string;
    hero(publicId: string): string;
}
