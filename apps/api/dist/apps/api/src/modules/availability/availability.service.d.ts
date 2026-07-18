import { PrismaService } from '../../database/prisma.service';
export declare class AvailabilityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    check(roomTypeSlug: string, checkIn: string, checkOut: string, guests: number): Promise<{
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
    findAvailableRoom(roomTypeSlug: string, checkIn: string, checkOut: string, guests: number): Promise<any>;
    getBlockedDates(roomTypeSlug: string): Promise<{
        start: string;
        end: string;
    }[]>;
}
