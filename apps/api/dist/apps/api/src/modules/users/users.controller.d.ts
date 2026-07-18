import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    me(user: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        nationality: string | null;
        preferredLocale: string;
        emailVerifiedAt: Date | null;
        createdAt: Date;
    }>;
    update(user: any, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        nationality: string | null;
        preferredLocale: string;
        createdAt: Date;
    }>;
}
