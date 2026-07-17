import { Request } from 'express';
import { AuthService } from './auth.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly auth;
    private readonly notifications;
    constructor(auth: AuthService, notifications: NotificationsService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refresh(dto: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logout(dto: RefreshDto): Promise<void>;
    me(user: any): any;
    forgotPassword(dto: ForgotPasswordDto, req: Request): Promise<void>;
    resetPassword(dto: ResetPasswordDto): Promise<void>;
}
