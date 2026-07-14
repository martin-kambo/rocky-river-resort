/**
 * BookingReferenceService — generates and validates booking references.
 *
 * Format: RRR-XXXXXX (6 uppercase alphanumeric chars, no ambiguous chars)
 * Pure function — no dependencies.
 */
export class BookingReferenceService {
  private static readonly CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  private static readonly PREFIX = 'RRR-'

  static generate(): string {
    let ref = this.PREFIX
    for (let i = 0; i < 6; i++) {
      ref += this.CHARS[Math.floor(Math.random() * this.CHARS.length)]
    }
    return ref
  }

  static isValid(ref: string): boolean {
    return /^RRR-[A-Z0-9]{6}$/.test(ref)
  }
}