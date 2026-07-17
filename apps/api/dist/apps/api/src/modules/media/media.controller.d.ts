import { MediaService } from './media.service';
export declare class MediaController {
    private readonly media;
    constructor(media: MediaService);
    uploadRoomImage(slug: string, file: Express.Multer.File): Promise<{
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
    deleteMedia(publicId: string): Promise<{
        deleted: boolean;
        publicId: string;
    }>;
}
