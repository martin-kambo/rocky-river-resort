import { PricingService } from './pricing.service'

describe('PricingService', () => {
  describe('calculateTotal', () => {
    it('calculates correct totals for 2 nights at base rate', () => {
      const result = PricingService.calculateTotal({
        basePriceKes: 28_000,
        basePriceUsd: 215,
        nights:       2,
      })
      expect(result.subtotalKes).toBe(56_000)
      expect(result.vatKes).toBeCloseTo(8_960)
      expect(result.totalKes).toBeCloseTo(64_960)
      expect(result.nights).toBe(2)
      expect(result.multiplier).toBe(1)
    })

    it('applies seasonal multiplier correctly', () => {
      const result = PricingService.calculateTotal({
        basePriceKes: 28_000,
        basePriceUsd: 215,
        nights:       3,
        multiplier:   1.5,
      })
      expect(result.perNightKes).toBe(42_000)
      expect(result.subtotalKes).toBe(126_000)
      expect(result.totalKes).toBeCloseTo(146_160) // 126000 * 1.16
    })

    it('handles single-night bookings', () => {
      const r = PricingService.calculateTotal({ basePriceKes: 18_000, basePriceUsd: 138, nights: 1 })
      expect(r.subtotalKes).toBe(18_000)
      expect(r.nights).toBe(1)
    })
  })

  describe('findActiveMultiplier', () => {
    const seasonal = [
      { startDate: new Date('2025-12-20'), endDate: new Date('2026-01-05'), multiplier: 1.5 },
      { startDate: new Date('2026-04-01'), endDate: new Date('2026-04-12'), multiplier: 1.3 },
    ]

    it('returns multiplier for dates within a seasonal period', () => {
      const m = PricingService.findActiveMultiplier(
        seasonal, new Date('2025-12-24'), new Date('2025-12-26'),
      )
      expect(m).toBe(1.5)
    })

    it('returns 1 when no seasonal pricing applies', () => {
      const m = PricingService.findActiveMultiplier(
        seasonal, new Date('2026-06-01'), new Date('2026-06-03'),
      )
      expect(m).toBe(1)
    })
  })
})