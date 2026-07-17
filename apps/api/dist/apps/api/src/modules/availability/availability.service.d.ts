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
    findAvailableRoom(roomTypeSlug: string, checkIn: string, checkOut: string, guests: number): Promise<({
        roomType: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            nameEn: string;
            nameSw: string;
            descriptionEn: string;
            descriptionSw: string;
            basePriceKes: import("@prisma/client/runtime/library").Decimal;
            basePriceUsd: import("@prisma/client/runtime/library").Decimal;
            maxOccupancy: number;
            sizeSqm: import("@prisma/client/runtime/library").Decimal;
            amenities: string[];
            isActive: boolean;
            sortOrder: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomTypeId: string;
        floor: number;
        viewType: import(".prisma/client").$Enums.ViewType;
        status: import(".prisma/client").$Enums.RoomStatus;
        notes: string | null;
    }) | null>;
    getBlockedDates(roomTypeSlug: string): Promise<{
        start: string;
        end: string;
    }[]>;
}
