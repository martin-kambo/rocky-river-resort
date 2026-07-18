import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly rooms;
    constructor(rooms: RoomsService);
    findAll(): Promise<({
        rooms: {
            id: string;
        }[];
        images: {
            id: string;
            createdAt: Date;
            sortOrder: number;
            roomTypeId: string;
            url: string;
            altEn: string;
            altSw: string;
            isHero: boolean;
        }[];
    } & {
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
    })[]>;
    findOne(slug: string): Promise<{
        rooms: {
            id: string;
            roomNumber: string;
            floor: number;
            viewType: import(".prisma/client").$Enums.ViewType;
        }[];
        images: {
            id: string;
            createdAt: Date;
            sortOrder: number;
            roomTypeId: string;
            url: string;
            altEn: string;
            altSw: string;
            isHero: boolean;
        }[];
        seasonalPricing: {
            id: string;
            createdAt: Date;
            roomTypeId: string;
            startDate: Date;
            endDate: Date;
            multiplier: import("@prisma/client/runtime/library").Decimal;
            label: string | null;
        }[];
    } & {
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
    }>;
}
