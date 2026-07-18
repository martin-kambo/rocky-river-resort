import { PrismaService } from '../../database/prisma.service';
import { AvailabilityService } from '../availability/availability.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private readonly prisma;
    private readonly availability;
    private readonly notifications;
    constructor(prisma: PrismaService, availability: AvailabilityService, notifications: NotificationsService);
    create(dto: CreateBookingDto, user: any): Promise<any>;
    findByUser(userId: string): Promise<any>;
    findOne(id: string, userId: string, isAdmin?: boolean): Promise<any>;
    findByReference(ref: string, userId: string): Promise<any>;
    cancel(id: string, userId: string): Promise<any>;
    private dispatchNotifications;
}
