import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analytics;
    constructor(analytics: AnalyticsService);
    stats(): Promise<{
        monthBookings: number;
        occupiedTonight: number;
        monthRevenueKes: number;
        occupancyRate: number;
    }>;
    occupancy(days?: number): Promise<{
        date: string;
        occupied: number;
        available: number;
    }[]>;
    revenue(year?: number): Promise<{
        year: number;
        totalKes: number;
        byMonth: {
            month: number;
            year: number;
            revenueKes: number;
            payments: number;
        }[];
    }>;
    topRooms(): Promise<{
        roomType: any;
        bookings: any;
        revenueKes: number;
    }[]>;
}
