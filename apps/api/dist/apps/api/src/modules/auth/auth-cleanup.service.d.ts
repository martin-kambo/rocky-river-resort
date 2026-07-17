import { PrismaService } from '../../database/prisma.service';
export declare class AuthCleanupService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    purgeExpiredTokens(): Promise<{
        deleted: number;
    }>;
}
