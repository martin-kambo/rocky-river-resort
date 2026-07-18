import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsController {
    private readonly bookings;
    constructor(bookings: BookingsService);
    create(dto: CreateBookingDto, user: any): Promise<any>;
    findAll(user: any): Promise<({
        room: {
            roomType: {
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
    })[]>;
    findByRef(ref: string, user: any): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        room: {
            roomType: {
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
    findOne(id: string, user: any): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string | null;
        };
        room: {
            roomType: {
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
    cancel(id: string, user: any): Promise<any>;
}
