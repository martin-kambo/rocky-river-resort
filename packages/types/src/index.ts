// ─── Enums ────────────────────────────────────────────────────────────────────
export enum UserRole {
  GUEST = 'guest',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export enum BookingStatus {
  PENDING    = 'PENDING',
  CONFIRMED  = 'CONFIRMED',
  CANCELLED  = 'CANCELLED',
  COMPLETED  = 'COMPLETED',
}

export enum PaymentProvider {
  STRIPE = 'STRIPE',
  MPESA  = 'MPESA',
  PAYPAL = 'PAYPAL',
}

export enum PaymentStatus {
  PENDING  = 'PENDING',
  SUCCESS  = 'SUCCESS',
  FAILED   = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum RoomViewType {
  RIVER  = 'river',
  POOL   = 'pool',
  GARDEN = 'garden',
}

export enum BookingSource {
  WEBSITE = 'website',
  PHONE   = 'phone',
  WALK_IN = 'walk_in',
  OTA     = 'ota',
}

// ─── Core entities ─────────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: UserRole
  nationality?: string
  preferredLocale: 'en' | 'sw'
  emailVerifiedAt?: string
  createdAt: string
}

export interface RoomImage {
  id: string
  url: string
  altEn: string
  altSw: string
  sortOrder: number
  isHero: boolean
}

export interface RoomType {
  id: string
  slug: string
  nameEn: string
  nameSw: string
  descriptionEn: string
  descriptionSw: string
  basePriceKes: number
  basePriceUsd: number
  maxOccupancy: number
  sizeSqm: number
  amenities: string[]
  viewType?: RoomViewType
  images: RoomImage[]
  isActive: boolean
}

export interface Room {
  id: string
  roomTypeId: string
  roomType: RoomType
  roomNumber: string
  floor: number
  viewType: RoomViewType
  status: 'available' | 'occupied' | 'maintenance'
}

export interface Payment {
  id: string
  bookingId: string
  provider: PaymentProvider
  providerRef: string
  amount: number
  currency: string
  status: PaymentStatus
  paidAt?: string
}

export interface Booking {
  id: string
  reference: string
  userId: string
  user?: User
  roomId: string
  room: Room
  checkIn: string
  checkOut: string
  nights: number
  adults: number
  children: number
  status: BookingStatus
  totalKes: number
  totalUsd: number
  specialRequests?: string
  source: BookingSource
  payments: Payment[]
  createdAt: string
  confirmedAt?: string
}

// ─── API request / response shapes ───────────────────────────────────────────
export interface CreateBookingRequest {
  roomTypeSlug: string
  checkIn: string
  checkOut: string
  adults: number
  children?: number
  specialRequests?: string
}

export interface AvailabilityQuery {
  roomTypeSlug: string
  checkIn: string
  checkOut: string
  adults: number
}

export interface AvailabilityResponse {
  available: boolean
  roomTypeSlug: string
  pricePerNightKes: number
  pricePerNightUsd: number
  totalNights: number
  subtotalKes: number
  subtotalUsd: number
  vatKes: number
  vatUsd: number
  totalKes: number
  totalUsd: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  statusCode: number
  message: string | string[]
  error: string
  timestamp: string
  path: string
}