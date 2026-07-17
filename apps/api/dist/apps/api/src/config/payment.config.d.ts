declare const _default: (() => {
    stripe: {
        secretKey: string;
        webhookSecret: string;
    };
    mpesa: {
        environment: string;
        consumerKey: string;
        consumerSecret: string;
        shortcode: string;
        passkey: string;
        callbackUrl: string;
    };
    resend: {
        apiKey: string;
        from: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    stripe: {
        secretKey: string;
        webhookSecret: string;
    };
    mpesa: {
        environment: string;
        consumerKey: string;
        consumerSecret: string;
        shortcode: string;
        passkey: string;
        callbackUrl: string;
    };
    resend: {
        apiKey: string;
        from: string;
    };
}>;
export default _default;
