/**
 * lib/whatsapp.ts
 * Builds the wa.me pre-filled message URL for room service orders.
 * No API, no webhook — customer opens WhatsApp and taps Send.
 */

import type { CartItem } from '@/types'

interface OrderParams {
  items:        CartItem[]
  guestName:    string
  roomNumber:   string
  specialNotes?: string
}

/**
 * Build a WhatsApp deep-link with the order pre-filled.
 * Opens in WhatsApp Web or the app — customer just taps Send.
 */
export function buildWhatsAppOrderURL(params: OrderParams): string {
  const { items, guestName, roomNumber, specialNotes } = params
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  if (!phone) {
    console.error('NEXT_PUBLIC_WHATSAPP_NUMBER is not set in .env.local')
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const itemLines = items.map(item =>
    `  • ${item.name} × ${item.quantity}  —  KES ${(item.price * item.quantity).toLocaleString('en-KE')}`
  )

  const lines: (string | null)[] = [
    `🏞️ *Rocky River Resort — Room Service Order*`,
    ``,
    `*Guest:* ${guestName}`,
    `*Room / Table:* ${roomNumber}`,
    ``,
    `*Order:*`,
    ...itemLines,
    ``,
    `*Total: KES ${total.toLocaleString('en-KE')}*`,
    specialNotes ? `*Special requests:* ${specialNotes}` : null,
    ``,
    `_Sent via Rocky River Resort website_`,
    `_Where Serenity Meets the River_ 🌿`,
  ]

  const message = lines.filter((l): l is string => l !== null).join('\n')

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/**
 * Build a simple WhatsApp enquiry link (not an order — for contact CTA).
 * buildWhatsAppEnquiryURL("I'd like to book the Cascade Chalet for August")
 */
export function buildWhatsAppEnquiryURL(message?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  const text  = message ?? 'Hello, I\'d like to enquire about Rocky River Resort.'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}