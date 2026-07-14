/**
 * lib/storage.ts
 * Supabase Storage helpers for uploading and deleting resort images.
 * Used in admin panel image upload components.
 */

import { createClient } from '@/lib/supabase/client'

const BUCKET = 'resort-images'

export type StorageFolder = 'rooms' | 'gallery' | 'menu' | 'events' | 'og'

export interface UploadResult {
  url:      string    // public URL to save in the database
  path:     string    // storage path (needed for deletion)
  filename: string
}

/**
 * Upload a single image file to Supabase Storage.
 * Returns the public URL to store in the database.
 *
 * Usage:
 *   const result = await uploadImage(file, 'gallery')
 *   await supabase.from('gallery').insert({ image_url: result.url })
 */
export async function uploadImage(
  file:   File,
  folder: StorageFolder,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const supabase = createClient()

  // Validate file type
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  if (!allowed.includes(file.type)) {
    throw new Error(`File type not supported: ${file.type}. Use JPEG, PNG, or WebP.`)
  }

  // Validate file size — 10MB max
  const MAX_SIZE = 10 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max 10MB.`)
  }

  // Generate a unique filename so uploads never overwrite each other
  const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const unique   = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const filename = `${unique}.${ext}`
  const path     = `${folder}/${filename}`

  // Simulate progress start (Supabase JS client doesn't expose upload progress natively)
  onProgress?.(10)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',   // CDN caches for 1 hour
      upsert:       false,    // Never silently overwrite — fail loudly
      contentType:  file.type,
    })

  if (error) throw new Error(`Upload failed: ${error.message}`)

  onProgress?.(90)

  // Get the permanent, public URL for this file
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)

  onProgress?.(100)

  return {
    url:      data.publicUrl,
    path,
    filename,
  }
}

/**
 * Upload multiple images in parallel.
 * Returns an array of public URLs in the same order as input files.
 */
export async function uploadImages(
  files:  File[],
  folder: StorageFolder
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map(file => uploadImage(file, folder))
  )
  return results
}

/**
 * Delete an image from Supabase Storage by its public URL.
 * Call this when an admin deletes a gallery item or room.
 */
export async function deleteImage(publicUrl: string): Promise<void> {
  const supabase = createClient()

  // Extract the storage path from the full public URL
  // URL format: https://xxx.supabase.co/storage/v1/object/public/resort-images/gallery/abc.jpg
  const marker = `/object/public/${BUCKET}/`
  const path   = publicUrl.split(marker)[1]

  if (!path) {
    console.warn('deleteImage: could not extract path from URL', publicUrl)
    return
  }

  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw new Error(`Delete failed: ${error.message}`)
}

/**
 * Delete multiple images in parallel.
 */
export async function deleteImages(publicUrls: string[]): Promise<void> {
  await Promise.all(publicUrls.map(url => deleteImage(url)))
}