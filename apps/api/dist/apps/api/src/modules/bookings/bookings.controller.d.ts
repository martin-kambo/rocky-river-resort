import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsController {
    private readonly bookings;
    constructor(bookings: BookingsService);
    create(dto: CreateBookingDto, user: any): Promise<any>;
    findAll(user: any): Promise<any>;
    findByRef(ref: string, user: any): Promise<any>;
    findOne(id: string, user: any): Promise<any>;
    cancel(id: string, user: any): Promise<any>;
}
