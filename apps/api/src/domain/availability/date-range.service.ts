import { differenceInCalendarDays, isAfter, isBefore, isEqual } from 'date-fns'

/**
 * DateRangeService — pure date arithmetic used in availability checks.
 *
 * No database. No external dependencies. Fully unit-testable.
 */
export class DateRangeService {
  static nights(checkIn: Date | string, checkOut: Date | string): number {
    return differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  static overlaps(
    a: { start: Date; end: Date },
    b: { start: Date; end: Date },
  ): boolean {
    return isBefore(a.start, b.end) && isAfter(a.end, b.start)
  }

  static isValidRange(checkIn: Date | string, checkOut: Date | string): boolean {
    const ci = new Date(checkIn)
    const co = new Date(checkOut)
    return isAfter(co, ci) && !isEqual(ci, co)
  }

  static isInFuture(date: Date | string, now = new Date()): boolean {
    return isAfter(new Date(date), now)
  }

  static toDateString(date: Date): string {
    return date.toISOString().slice(0, 10)
  }
}