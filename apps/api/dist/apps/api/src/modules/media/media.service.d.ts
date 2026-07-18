import { PrismaService } from '../../database/prisma.service';
import type { MediaProvider } from '../../infrastructure/media/media-provider.interface';
export declare class MediaService {
    private readonly prisma;
    private readonly media;
    constructor(prisma: PrismaService, media: MediaProvider);
    uploadRoomImage(roomTypeSlug: string, buffer: Buffer, filename: string): Promise<{
        image: {
            id: string;
            createdAt: Date;
            sortOrder: number;
            roomTypeId: string;
            url: string;
            altEn: string;
            altSw: string;
            isHero: boolean;
        };
        cdn: {
            original: string;
            hero: string;
            thumbnail: string;
        };
    }>;
    delete(publicId: string): Promise<{
        deleted: boolean;
        publicId: string;
    }>;
}
