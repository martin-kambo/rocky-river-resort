import { AvailabilityService } from './availability.service';
export declare class AvailabilityController {
    private readonly availability;
    constructor(availability: AvailabilityService);
    check(slug: string, checkIn: string, checkOut: string, guests: number): Promise<{
        available: boolean;
        roomTypeSlug: string;
        pricePerNightKes: number;
        pricePerNightUsd: number;
        totalNights: number;
        subtotalKes: number;
        subtotalUsd: number;
        vatKes: number;
        vatUsd: number;
        totalKes: number;
        totalUsd: number;
    }>;
    blockedDates(slug: string): Promise<{
        start: string;
        end: string;
    }[]>;
}
