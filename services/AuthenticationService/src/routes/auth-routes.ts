import express, {Request, Response} from "express"
import {LogFirebaseUser, RegisterFirebaseUser} from "./firebase-authenticator"

import firebase from 'firebase';
export const AuthRouter = express.Router()
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const publicToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/AuthenticationService/src/public.pem", {encoding: "utf8"})
const privateToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/AuthenticationService/src/private.pem", {encoding: "utf8"})

const AuthenticationErrors: ErrorCodes.AuthErrorCodes = {
    EmailNotRegistered: "auth/user-not-found",
    PasswordUnkown: "auth/wrong-password",
    EmptyStringError:"auth/empty-string",
    Registration_InvalidEmail: "auth/invalid-email",
    Registration_WeakPassword: "auth/weak-password",
    GenericError: "auth/gen-error",
}
const AuthSuccess = {
    Success: "auth/successful"
}

const NonNullCredentials = (email: JWT.RegisterParams, password: JWT.RegisterParams) => {
    const NonNullInputs = (email != null) && (password != null)
    const NonEmptyStrings = (`${email}`.length > 0) && (`${password}`.length > 0)
    return NonNullInputs && NonEmptyStrings
}

AuthRouter.post('/register', (req: Request, res: Response) => {
    if(! NonNullCredentials(req.query.email, req.query.password)){
        res.json({
            result: true,
            msg: AuthSuccess.Success
        })
    }
    RegisterFirebaseUser(`${req.query.email}`, `${req.query.password}`)
    .then((credentials: firebase.auth.UserCredential|firebase.FirebaseError) => {
        res.json({
            result: true,
            msg: AuthSuccess.Success
        })
    })
    .catch((AuthError: firebase.FirebaseError) => {
        res.json({
            result: false,
            msg: AuthError.code
        })
    })
})

AuthRouter.get('/login', (req: Request, res: Response) => {
    if(! NonNullCredentials(req.query.email, req.query.password)){
        res.json({
            result: false,
            msg:AuthenticationErrors.EmptyStringError
        })
        res.send(AuthenticationErrors.EmptyStringError)
    }
    LogFirebaseUser(`${req.query.email}`, `${req.query.password}`)
    .then((credentials: firebase.auth.UserCredential|firebase.FirebaseError) => {
        res.json({
            result: true,
            msg: AuthSuccess.Success
        })
    })
    .catch((AuthError: firebase.FirebaseError) => {
        res.json({
            result: false,
            msg: AuthError.code
        })
    })
})
