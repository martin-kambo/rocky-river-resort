import { PrismaService } from '../../database/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listBookings({ page, limit, status, }: {
        page: number;
        limit: number;
        status?: string;
    }): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    bookingStats(): Promise<{
        monthBookings: any;
        occupiedTonight: any;
        monthRevenueKes: number;
        occupancyRate: number;
    }>;
    getBooking(id: string): Promise<any>;
    updateBookingStatus(id: string, status: string): Promise<any>;
    listRooms(): Promise<any>;
    updateRoomStatus(id: string, status: string, notes?: string): Promise<any>;
    listGuests({ page, limit }: {
        page: number;
        limit: number;
    }): Promise<{
        data: any;
        total: any;
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
            payments: any;
        }[];
    }>;
    listSeasonalPricing(): Promise<any>;
    createSeasonalPricing(data: {
        roomTypeSlug: string;
        startDate: string;
        endDate: string;
        multiplier: number;
        label?: string;
    }): Promise<any>;
    deleteSeasonalPricing(id: string): Promise<any>;
}
