/**
 * Local string enum constants mirroring the Prisma schema.
 *
 * WHY THIS FILE EXISTS:
 * Prisma generates enums into its client at build time. During CI type-checking
 * the client may not yet be generated, so importing from '@prisma/client' fails.
 * This file provides the same enum values as plain TypeScript constants.
 *
 * MAINTENANCE RULE:
 * If you add or rename an enum value in prisma/schema.prisma, you MUST update
 * this file to match. The two must stay in sync.
 *
 * FUTURE: Once Prisma client generation is guaranteed before tsc in CI
 * (e.g. via `prisma generate && tsc --noEmit`), this file can be removed
 * and all imports replaced with `import { BookingStatus } from '@prisma/client'`.
 */

export const BookingStatus = {
  PENDING:   'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]

export const PaymentStatus = {
  PENDING:  'PENDING',
  SUCCESS:  'SUCCESS',
  FAILED:   'FAILED',
  REFUNDED: 'REFUNDED',
} as const
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

export const RoomStatus = {
  available:   'available',
  occupied:    'occupied',
  maintenance: 'maintenance',
} as const
export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus]