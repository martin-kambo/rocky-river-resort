/**
 * PricingService — pure business logic for pricing calculations.
 *
 * No database. No HTTP. No framework decorators.
 * Takes data in, returns computed values.
 * 100% unit-testable without mocks.
 */
export class PricingService {
  private static readonly VAT_RATE = 0.16

  static calculateTotal(params: {
    basePriceKes:  number
    basePriceUsd:  number
    nights:        number
    multiplier?:   number
  }): PricingResult {
    const m           = params.multiplier ?? 1
    const perNightKes = params.basePriceKes * m
    const perNightUsd = params.basePriceUsd * m
    const subtotalKes = perNightKes * params.nights
    const subtotalUsd = perNightUsd * params.nights
    const vatKes      = subtotalKes * this.VAT_RATE
    const vatUsd      = subtotalUsd * this.VAT_RATE

    return {
      perNightKes:  round2(perNightKes),
      perNightUsd:  round2(perNightUsd),
      subtotalKes:  round2(subtotalKes),
      subtotalUsd:  round2(subtotalUsd),
      vatKes:       round2(vatKes),
      vatUsd:       round2(vatUsd),
      totalKes:     round2(subtotalKes + vatKes),
      totalUsd:     round2(subtotalUsd + vatUsd),
      nights:       params.nights,
      multiplier:   m,
    }
  }

  static findActiveMultiplier(
    seasonalPricing: { startDate: Date; endDate: Date; multiplier: number }[],
    checkIn:         Date,
    checkOut:        Date,
  ): number {
    const match = seasonalPricing.find(
      (sp) => sp.startDate <= checkIn && sp.endDate >= checkOut,
    )
    return match ? match.multiplier : 1
  }
}

export interface PricingResult {
  perNightKes: number
  perNightUsd: number
  subtotalKes: number
  subtotalUsd: number
  vatKes:      number
  vatUsd:      number
  totalKes:    number
  totalUsd:    number
  nights:      number
  multiplier:  number
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}