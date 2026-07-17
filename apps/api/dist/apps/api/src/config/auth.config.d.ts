declare const _default: (() => {
    jwtSecret: string;
    jwtRefreshSecret: string;
    jwtAccessTtl: number;
    jwtRefreshTtl: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    jwtSecret: string;
    jwtRefreshSecret: string;
    jwtAccessTtl: number;
    jwtRefreshTtl: number;
}>;
export default _default;
