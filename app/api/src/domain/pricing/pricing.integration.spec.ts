import { PricingService } from './pricing.service'

/**
 * Integration-style tests covering real-world booking scenarios
 * for Rocky River Resort pricing. All expected values verified
 * by hand calculation before being added.
 */
describe('PricingService — booking scenarios', () => {

  describe('Weekend break — River Suite, 2 nights, base rate', () => {
    it('calculates correct subtotal, VAT, and total', () => {
      // 28000 KES × 2 = 56000 subtotal; VAT 16% = 8960; total 64960
      // 215 USD × 2 = 430 subtotal; VAT 16% = 68.80; total 498.80
      const result = PricingService.calculateTotal({
        basePriceKes: 28_000,
        basePriceUsd: 215,
        nights:       2,
      })
      expect(result.perNightKes).toBe(28_000)
      expect(result.perNightUsd).toBe(215)
      expect(result.subtotalKes).toBe(56_000)
      expect(result.vatKes).toBe(8_960)
      expect(result.totalKes).toBe(64_960)
      expect(result.subtotalUsd).toBe(430)
      expect(result.vatUsd).toBeCloseTo(68.8, 1)
      expect(result.totalUsd).toBeCloseTo(498.8, 1)
      expect(result.nights).toBe(2)
      expect(result.multiplier).toBe(1)
    })
  })

  describe('Christmas peak — River Suite, 7 nights, 1.5× multiplier', () => {
    it('applies multiplier before VAT calculation', () => {
      // 28000 × 1.5 = 42000/night; × 7 = 294000 subtotal; VAT = 47040; total = 341040
      const result = PricingService.calculateTotal({
        basePriceKes: 28_000,
        basePriceUsd: 215,
        nights:       7,
        multiplier:   1.5,
      })
      expect(result.perNightKes).toBe(42_000)
      expect(result.subtotalKes).toBe(294_000)
      expect(result.vatKes).toBe(47_040)
      expect(result.totalKes).toBe(341_040)
      expect(result.multiplier).toBe(1.5)
    })
  })

  describe('Family Villa — 5 nights, Easter 1.3× multiplier', () => {
    it('computes family villa Easter pricing correctly', () => {
      // 48000 × 1.3 = 62400/night; × 5 = 312000 subtotal; VAT = 49920; total = 361920
      const result = PricingService.calculateTotal({
        basePriceKes: 48_000,
        basePriceUsd: 368,
        nights:       5,
        multiplier:   1.3,
      })
      expect(result.perNightKes).toBe(62_400)
      expect(result.subtotalKes).toBe(312_000)
      expect(result.vatKes).toBe(49_920)
      expect(result.totalKes).toBe(361_920)
    })
  })

  describe('Single night — Savannah Room, base rate', () => {
    it('handles single-night bookings without rounding errors', () => {
      const result = PricingService.calculateTotal({
        basePriceKes: 18_000,
        basePriceUsd: 138,
        nights:       1,
      })
      expect(result.subtotalKes).toBe(18_000)
      expect(result.vatKes).toBe(2_880)
      expect(result.totalKes).toBe(20_880)
      expect(result.nights).toBe(1)
    })
  })

  describe('findActiveMultiplier', () => {
    const seasonal = [
      { startDate: new Date('2025-12-20'), endDate: new Date('2026-01-05'), multiplier: 1.5 },
      { startDate: new Date('2026-04-02'), endDate: new Date('2026-04-12'), multiplier: 1.3 },
      { startDate: new Date('2026-08-01'), endDate: new Date('2026-08-31'), multiplier: 1.2 },
    ]

    it('returns 1.5 for a Christmas booking', () => {
      const m = PricingService.findActiveMultiplier(
        seasonal, new Date('2025-12-23'), new Date('2025-12-26'),
      )
      expect(m).toBe(1.5)
    })

    it('returns 1.3 for an Easter booking', () => {
      const m = PricingService.findActiveMultiplier(
        seasonal, new Date('2026-04-04'), new Date('2026-04-07'),
      )
      expect(m).toBe(1.3)
    })

    it('returns 1.2 for an August peak booking', () => {
      const m = PricingService.findActiveMultiplier(
        seasonal, new Date('2026-08-10'), new Date('2026-08-13'),
      )
      expect(m).toBe(1.2)
    })

    it('returns 1 for an off-peak booking (no seasonal match)', () => {
      const m = PricingService.findActiveMultiplier(
        seasonal, new Date('2026-06-10'), new Date('2026-06-13'),
      )
      expect(m).toBe(1)
    })

    it('returns 1 for an empty seasonal pricing array', () => {
      expect(PricingService.findActiveMultiplier([], new Date(), new Date())).toBe(1)
    })
  })
})