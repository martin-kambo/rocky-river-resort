/**
 * lib/validations.ts
 * Zod schemas for every form in Rocky River Resort.
 * Used for both client-side validation (instant feedback)
 * and server-side validation (API routes, Server Actions).
 */

import { z } from 'zod'

// ─────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────

export const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Please enter your name')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^(\+?254|0)[17]\d{8}$/, 'Enter a valid Kenyan number (e.g. 0712345678)')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(3, 'Subject too short')
    .max(120)
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Please write at least 10 characters')
    .max(2000, 'Message is too long — please keep it under 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>

// ─────────────────────────────────────────────────────────
// ORDER (WhatsApp cart)
// ─────────────────────────────────────────────────────────

export const orderItemSchema = z.object({
  id:    z.string().uuid(),
  name:  z.string().min(1),
  qty:   z.number().int().positive(),
  price: z.number().positive(),
})

export const orderSchema = z.object({
  customer_name:  z.string().min(1, 'Please enter your name'),
  customer_phone: z.string().optional(),
  room_number:    z.string().min(1, 'Please enter your room or table number'),
  items:          z.array(orderItemSchema).min(1, 'Your order is empty'),
  total_amount:   z.number().positive(),
  notes:          z.string().max(500).optional(),
})

export type OrderFormData = z.infer<typeof orderSchema>

// ─────────────────────────────────────────────────────────
// ROOM (admin panel)
// ─────────────────────────────────────────────────────────

export const roomSchema = z.object({
  name: z
    .string()
    .min(2, 'Room name is required')
    .max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z
    .string()
    .max(1000)
    .optional(),
  price_per_night: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
  capacity: z
    .number()
    .int()
    .min(1, 'Minimum 1 guest')
    .max(20),
  bedrooms: z
    .number()
    .int()
    .min(1)
    .max(10),
  view_type: z.string().optional(),
  amenities: z.array(z.string()).default([]),
  images:    z.array(z.string().url()).default([]),
  is_featured:  z.boolean().default(false),
  is_available: z.boolean().default(true),
})

export type RoomFormData = z.infer<typeof roomSchema>

// ─────────────────────────────────────────────────────────
// MENU ITEM (admin panel)
// ─────────────────────────────────────────────────────────

export const menuItemSchema = z.object({
  name: z
    .string()
    .min(2, 'Item name is required')
    .max(100),
  description: z
    .string()
    .max(500)
    .optional(),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
  category_id: z
    .string()
    .uuid('Please select a category')
    .optional(),
  tag: z
    .enum(['popular', 'veg', 'spicy', ''])
    .optional(),
  dietary:      z.array(z.string()).default([]),
  allergens:    z.array(z.string()).default([]),
  image_url:    z.string().url().optional().or(z.literal('')),
  is_featured:  z.boolean().default(false),
  is_available: z.boolean().default(true),
})

export type MenuItemFormData = z.infer<typeof menuItemSchema>

// ─────────────────────────────────────────────────────────
// EVENT (admin panel)
// ─────────────────────────────────────────────────────────

export const eventSchema = z.object({
  title: z
    .string()
    .min(2, 'Event title is required')
    .max(150),
  description: z.string().max(1000).optional(),
  image_url:   z.string().url().optional().or(z.literal('')),
  event_date:  z.string().min(1, 'Please select a date and time'),
  location:    z.string().max(200).optional(),
  price:       z.number().nonnegative().nullable().optional(),
  is_published: z.boolean().default(true),
})

export type EventFormData = z.infer<typeof eventSchema>

// ─────────────────────────────────────────────────────────
// GALLERY IMAGE (admin panel)
// ─────────────────────────────────────────────────────────

export const gallerySchema = z.object({
  title:     z.string().max(150).optional(),
  image_url: z.string().url('Image URL is required'),
  category: z.enum(['rooms', 'dining', 'nature', 'events', 'general']).default('general'),
  sort_order:   z.number().int().default(0),
  is_published: z.boolean().default(true),
})

export type GalleryFormData = z.infer<typeof gallerySchema>

// ─────────────────────────────────────────────────────────
// ADMIN LOGIN
// ─────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email:    z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>