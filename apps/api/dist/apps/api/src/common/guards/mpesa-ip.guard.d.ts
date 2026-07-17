import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class MpesaIpGuard implements CanActivate {
    private readonly logger;
    private static readonly SAFARICOM_IPS;
    canActivate(context: ExecutionContext): boolean;
}
