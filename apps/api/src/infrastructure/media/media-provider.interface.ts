/**
 * MediaProvider — contract for all image hosting implementations.
 *
 * Business modules depend on this interface, never on Cloudinary directly.
 * To switch to S3/Cloudflare R2: implement this interface, rebind token.
 */

export interface UploadResult {
  publicId:    string
  url:         string
  secureUrl:   string
  width:       number
  height:      number
  format:      string
  bytes:       number
}

export interface TransformOptions {
  width?:   number
  height?:  number
  quality?: number | 'auto'
  format?:  'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  crop?:    'fill' | 'fit' | 'scale' | 'thumb'
  gravity?: 'auto' | 'face' | 'center'
}

export interface MediaProvider {
  /** Upload a file buffer and return the CDN result */
  upload(
    buffer:  Buffer,
    options: { folder: string; publicId?: string; tags?: string[] },
  ): Promise<UploadResult>

  /** Delete a file from storage by its public ID */
  delete(publicId: string): Promise<void>

  /** Build a CDN URL with optional image transforms */
  buildUrl(publicId: string, transforms?: TransformOptions): string

  /** Build a thumbnail URL (200×200 crop) */
  thumbnail(publicId: string): string

  /** Build a hero URL (1200×800 fill) */
  hero(publicId: string): string
}

export const MEDIA_PROVIDER = 'MEDIA_PROVIDER'