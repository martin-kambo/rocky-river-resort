export interface UploadResult {
    publicId: string;
    url: string;
    secureUrl: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
}
export interface TransformOptions {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    gravity?: 'auto' | 'face' | 'center';
}
export interface MediaProvider {
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
export declare const MEDIA_PROVIDER = "MEDIA_PROVIDER";
