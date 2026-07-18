import { AdminService } from './admin.service';
import { AuthCleanupService } from '../auth/auth-cleanup.service';
import { CreateSeasonalPricingDto } from './seasonal-pricing.dto';
export declare class AdminController {
    private readonly admin;
    private readonly cleanup;
    constructor(admin: AdminService, cleanup: AuthCleanupService);
    listBookings(page?: number, limit?: number, status?: string): Promise<{
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
    updateStatus(id: string, body: {
        status: string;
    }): Promise<any>;
    listRooms(): Promise<any>;
    updateRoomStatus(id: string, body: {
        status: string;
        notes?: string;
    }): Promise<any>;
    listGuests(page?: number, limit?: number): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    revenueReport(year?: number): Promise<{
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
    createSeasonalPricing(dto: CreateSeasonalPricingDto): Promise<any>;
    deleteSeasonalPricing(id: string): Promise<any>;
    cleanupTokens(): Promise<{
        deleted: number;
    }>;
}
