declare namespace NodeJS {
    interface ProcessEnv {
        readonly PORT: string;
        readonly DB: string;
        readonly NODE_ENV: string;
    }
}
