import { PrismaService } from '../../database/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        monthBookings: number;
        occupiedTonight: number;
        monthRevenueKes: number;
        occupancyRate: number;
    }>;
    getOccupancyTrend(days?: number): Promise<{
        date: string;
        occupied: number;
        available: number;
    }[]>;
    getRevenueByMonth(year?: number): Promise<{
        year: number;
        totalKes: number;
        byMonth: {
            month: number;
            year: number;
            revenueKes: number;
            payments: number;
        }[];
    }>;
    getTopRoomTypes(): Promise<{
        roomType: any;
        bookings: any;
        revenueKes: number;
    }[]>;
}
