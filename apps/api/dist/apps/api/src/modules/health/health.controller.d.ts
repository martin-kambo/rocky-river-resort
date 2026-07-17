import { PrismaService } from '../../database/prisma.service';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        timestamp: string;
        services: {
            api: string;
            database: string;
        };
        version: string;
    }>;
}
