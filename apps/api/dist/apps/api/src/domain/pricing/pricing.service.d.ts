export declare class PricingService {
    private static readonly VAT_RATE;
    static calculateTotal(params: {
        basePriceKes: number;
        basePriceUsd: number;
        nights: number;
        multiplier?: number;
    }): PricingResult;
    static findActiveMultiplier(seasonalPricing: {
        startDate: Date;
        endDate: Date;
        multiplier: number;
    }[], checkIn: Date, checkOut: Date): number;
}
export interface PricingResult {
    perNightKes: number;
    perNightUsd: number;
    subtotalKes: number;
    subtotalUsd: number;
    vatKes: number;
    vatUsd: number;
    totalKes: number;
    totalUsd: number;
    nights: number;
    multiplier: number;
}
