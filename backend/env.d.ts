declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: string;
        readonly DB: string;
        readonly BASE_URL: string;
        readonly NODE_ENV: string;
        readonly JWT_SECRET_KEY: string;
        readonly JWT_EXPIRES_IN: number;
        readonly EMAIL_HOST: string;
        readonly EMAIL_USERNAME: string;
        readonly EMAIL_PASSWORD: string;
    }
}
