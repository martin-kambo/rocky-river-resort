import { PrismaService } from '../../database/prisma.service';
export declare class RoomsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findBySlug(slug: string): Promise<any>;
}
