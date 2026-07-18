import { PrismaService } from '../../database/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        monthBookings: any;
        occupiedTonight: any;
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
            payments: any;
        }[];
    }>;
    getTopRoomTypes(): Promise<any>;
}
