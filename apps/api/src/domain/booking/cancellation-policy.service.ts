/**
 * CancellationPolicyService — encapsulates Rocky River Resort's cancellation rules.
 *
 * Policy: free cancellation ≥48 hours before check-in.
 * Pure logic — no database, no HTTP, fully testable.
 */
export class CancellationPolicyService {
  private static readonly FREE_CANCELLATION_HOURS = 48

  static canCancel(checkIn: Date, now = new Date()): CancellationResult {
    const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / 3_600_000

    if (hoursUntilCheckIn >= this.FREE_CANCELLATION_HOURS) {
      return { canCancel: true, refundable: true, hoursUntilCheckIn }
    }

    if (hoursUntilCheckIn > 0) {
      return { canCancel: false, refundable: false, hoursUntilCheckIn,
        reason: `Cancellations within ${this.FREE_CANCELLATION_HOURS} hours of check-in are non-refundable. Please contact us directly.` }
    }

    return { canCancel: false, refundable: false, hoursUntilCheckIn: 0,
      reason: 'Check-in date has already passed.' }
  }

  static getRefundPercentage(checkIn: Date, now = new Date()): number {
    const hours = (checkIn.getTime() - now.getTime()) / 3_600_000
    if (hours >= this.FREE_CANCELLATION_HOURS) return 100
    return 0
  }
}

export interface CancellationResult {
  canCancel:         boolean
  refundable:        boolean
  hoursUntilCheckIn: number
  reason?:           string
}