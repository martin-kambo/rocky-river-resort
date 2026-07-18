import { PrismaService } from '../../database/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listBookings({ page, limit, status, }: {
        page: number;
        limit: number;
        status?: string;
    }): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
            room: {
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
            };
            payments: {
                status: import(".prisma/client").$Enums.PaymentStatus;
                provider: import(".prisma/client").$Enums.PaymentProvider;
                amount: import("@prisma/client/runtime/library").Decimal;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.BookingStatus;
            userId: string;
            roomId: string;
            checkIn: Date;
            checkOut: Date;
            adults: number;
            children: number;
            specialRequests: string | null;
            reference: string;
            nights: number;
            totalKes: import("@prisma/client/runtime/library").Decimal;
            totalUsd: import("@prisma/client/runtime/library").Decimal;
            source: import(".prisma/client").$Enums.BookingSource;
            confirmedAt: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    bookingStats(): Promise<{
        monthBookings: number;
        occupiedTonight: number;
        monthRevenueKes: number;
        occupancyRate: number;
    }>;
    getBooking(id: string): Promise<{
        user: {
            id: string;
            email: string;
            passwordHash: string | null;
            firstName: string;
            lastName: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            nationality: string | null;
            preferredLocale: string;
            oauthProvider: string | null;
            oauthId: string | null;
            emailVerifiedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        room: {
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
        };
        review: {
            id: string;
            createdAt: Date;
            userId: string;
            bookingId: string;
            rating: number;
            comment: string;
            publishedAt: Date | null;
        } | null;
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            bookingId: string;
            provider: import(".prisma/client").$Enums.PaymentProvider;
            providerRef: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            payload: import("@prisma/client/runtime/library").JsonValue | null;
            paidAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        specialRequests: string | null;
        reference: string;
        nights: number;
        totalKes: import("@prisma/client/runtime/library").Decimal;
        totalUsd: import("@prisma/client/runtime/library").Decimal;
        source: import(".prisma/client").$Enums.BookingSource;
        confirmedAt: Date | null;
    }>;
    updateBookingStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        userId: string;
        roomId: string;
        checkIn: Date;
        checkOut: Date;
        adults: number;
        children: number;
        specialRequests: string | null;
        reference: string;
        nights: number;
        totalKes: import("@prisma/client/runtime/library").Decimal;
        totalUsd: import("@prisma/client/runtime/library").Decimal;
        source: import(".prisma/client").$Enums.BookingSource;
        confirmedAt: Date | null;
    }>;
    listRooms(): Promise<({
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
        availabilityBlocks: {
            id: string;
            createdAt: Date;
            startDate: Date;
            endDate: Date;
            roomId: string;
            reason: import(".prisma/client").$Enums.BlockReason;
            bookingId: string | null;
        }[];
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
    })[]>;
    updateRoomStatus(id: string, status: string, notes?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomTypeId: string;
        floor: number;
        viewType: import(".prisma/client").$Enums.ViewType;
        status: import(".prisma/client").$Enums.RoomStatus;
        notes: string | null;
    }>;
    listGuests({ page, limit }: {
        page: number;
        limit: number;
    }): Promise<{
        data: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
            nationality: string | null;
            createdAt: Date;
            _count: {
                bookings: number;
            };
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    revenueReport(year: number): Promise<{
        year: number;
        totalKes: number;
        byMonth: {
            month: number;
            year: number;
            revenueKes: number;
            payments: number;
        }[];
    }>;
    listSeasonalPricing(): Promise<({
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
        roomTypeId: string;
        startDate: Date;
        endDate: Date;
        multiplier: import("@prisma/client/runtime/library").Decimal;
        label: string | null;
    })[]>;
    createSeasonalPricing(data: {
        roomTypeSlug: string;
        startDate: string;
        endDate: string;
        multiplier: number;
        label?: string;
    }): Promise<{
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
        roomTypeId: string;
        startDate: Date;
        endDate: Date;
        multiplier: import("@prisma/client/runtime/library").Decimal;
        label: string | null;
    }>;
    deleteSeasonalPricing(id: string): Promise<{
        id: string;
        createdAt: Date;
        roomTypeId: string;
        startDate: Date;
        endDate: Date;
        multiplier: import("@prisma/client/runtime/library").Decimal;
        label: string | null;
    }>;
}
