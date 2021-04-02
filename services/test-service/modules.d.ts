declare namespace NodeJS{
    export interface ProcessEnv{
        NODE_ENV: string;
        FIREBASE_API_KEY: string;
    }
}

declare namespace JWT{
    export interface JWTResHead {
        algorithm: string,
        expiresIn: string
    }
    export interface JWTpay{
        iss: string
    }
}