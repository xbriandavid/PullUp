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
    export interface JWT_ID{
        token: string,
        issID: string
    }
    export type RegisterParams = string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined
}

declare namespace ErrorCodes{
    export interface AuthErrorCodes {
        EmailNotRegistered: string,
        PasswordUnkown: string,
        EmptyStringError: string,
        Registration_InvalidEmail: string,
        Registration_WeakPassword: string,
        GenericError: string
    }
}

declare namespace fb {
    export interface FirebaseError {
        code: string,
        message: string,
        name: string,
        stack?: string
    }
    export interface FireBaseResult{
        result: boolean,
        msg: string
    }
}

declare namespace kong{
    export interface KongAPIResult{
        result: string
    }
}