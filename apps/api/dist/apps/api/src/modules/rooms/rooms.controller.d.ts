import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly rooms;
    constructor(rooms: RoomsService);
    findAll(): Promise<any>;
    findOne(slug: string): Promise<any>;
}
