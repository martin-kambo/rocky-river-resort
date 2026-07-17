"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
class PricingService {
    static calculateTotal(params) {
        const m = params.multiplier ?? 1;
        const perNightKes = params.basePriceKes * m;
        const perNightUsd = params.basePriceUsd * m;
        const subtotalKes = perNightKes * params.nights;
        const subtotalUsd = perNightUsd * params.nights;
        const vatKes = subtotalKes * this.VAT_RATE;
        const vatUsd = subtotalUsd * this.VAT_RATE;
        return {
            perNightKes: round2(perNightKes),
            perNightUsd: round2(perNightUsd),
            subtotalKes: round2(subtotalKes),
            subtotalUsd: round2(subtotalUsd),
            vatKes: round2(vatKes),
            vatUsd: round2(vatUsd),
            totalKes: round2(subtotalKes + vatKes),
            totalUsd: round2(subtotalUsd + vatUsd),
            nights: params.nights,
            multiplier: m,
        };
    }
    static findActiveMultiplier(seasonalPricing, checkIn, checkOut) {
        const match = seasonalPricing.find((sp) => sp.startDate <= checkIn && sp.endDate >= checkOut);
        return match ? match.multiplier : 1;
    }
}
exports.PricingService = PricingService;
PricingService.VAT_RATE = 0.16;
function round2(n) {
    return Math.round(n * 100) / 100;
}
//# sourceMappingURL=pricing.service.js.map