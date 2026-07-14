import { DateRangeService } from './date-range.service'

describe('DateRangeService', () => {
  describe('nights', () => {
    it('calculates 2 nights correctly', () => {
      expect(DateRangeService.nights('2025-07-12', '2025-07-14')).toBe(2)
    })
    it('calculates 7 nights correctly', () => {
      expect(DateRangeService.nights('2025-08-01', '2025-08-08')).toBe(7)
    })
  })

  describe('overlaps', () => {
    const a = { start: new Date('2025-07-10'), end: new Date('2025-07-14') }

    it('detects overlapping ranges', () => {
      const b = { start: new Date('2025-07-12'), end: new Date('2025-07-16') }
      expect(DateRangeService.overlaps(a, b)).toBe(true)
    })

    it('detects non-overlapping ranges', () => {
      const b = { start: new Date('2025-07-15'), end: new Date('2025-07-18') }
      expect(DateRangeService.overlaps(a, b)).toBe(false)
    })

    it('considers adjacent ranges as non-overlapping (checkout = next check-in)', () => {
      const b = { start: new Date('2025-07-14'), end: new Date('2025-07-16') }
      expect(DateRangeService.overlaps(a, b)).toBe(false)
    })
  })

  describe('isValidRange', () => {
    it('accepts valid check-in before check-out', () => {
      expect(DateRangeService.isValidRange('2025-07-12', '2025-07-14')).toBe(true)
    })
    it('rejects same-day check-in and check-out', () => {
      expect(DateRangeService.isValidRange('2025-07-12', '2025-07-12')).toBe(false)
    })
    it('rejects reversed dates', () => {
      expect(DateRangeService.isValidRange('2025-07-14', '2025-07-12')).toBe(false)
    })
  })
})