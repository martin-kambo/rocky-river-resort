declare const _default: (() => {
    port: number;
    nodeEnv: string;
    corsOrigin: string;
    throttle: {
        ttl: number;
        limit: number;
    };
    baseUrl: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    nodeEnv: string;
    corsOrigin: string;
    throttle: {
        ttl: number;
        limit: number;
    };
    baseUrl: string;
}>;
export default _default;
