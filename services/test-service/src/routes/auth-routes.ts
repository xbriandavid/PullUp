import express, {Request, Response} from "express"
import firebase from 'firebase';
export const AuthRouter = express.Router()
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const axios = require('axios')
const publicToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/public.pem", {encoding: "utf8"})
const privateToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", {encoding: "utf8"})

const AuthenticationErrors: ErrorCodes.AuthErrorCodes = {
    EmailNotRegistered: "auth/user-not-found",
    PasswordUnkown: "auth/wrong-password",
    EmptyStringError:"auth/empty-string",
    GenericError: "auth/gen-error",
}

const NonNullCredentials = (email: JWT.RegisterParams, password: JWT.RegisterParams) => {
    const NonNullInputs = (email != null) && (password != null)
    const stringEmail = `${email}`
    const stringPassword = `${password}`
    const NonEmptyStrings = (stringEmail.length > 0) && (stringPassword.length > 0)
    return NonNullInputs && NonEmptyStrings
}

const CreateFirebaseUser = async (email: string, password: string) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log(error))
    // Verify that email has not been used
}

const LogFirebaseUser = async(email: string, password: string) => {
    const result = await firebase.auth().signInWithEmailAndPassword(`${email}`, `${password}`)
                    .then((credentials: any) => {
                        return credentials
                    })
                    .catch((error: firebase.FirebaseError) => {
                        return error
                    })
    return result
}

const HandleValidCredentials = (LoginResult: firebase.auth.UserCredential) => {
    const {"token": JWT, "issID": UserUUID} = CreateJWTWithID()
    if(LoginResult.user != null){
        AddJWTForConsumer(`${LoginResult.user.email}`, UserUUID)
        return {Result: true, ReturnValue: JWT}
    }
    else{
        return {Result: false, ReturnValue: AuthenticationErrors.GenericError}
    }
}

const HandleInvalidCredentials = (LoginResult: firebase.FirebaseError) =>{
    if(LoginResult.code == AuthenticationErrors.EmailNotRegistered || LoginResult.code == AuthenticationErrors.PasswordUnkown){
        return {ReturnValue: LoginResult.code}
    }
    else{
        return {ReturnValue: AuthenticationErrors.GenericError}
    }
}

/*
*  Returns an object containing a JWT and an ID
*  that maps the registered/logged account for a 
*  Kong consumer object
*/
const CreateJWTWithID = (): JWT.JWT_ID =>{
    const payload_iss: string = `${uuid.v4()}`
    const JWTResponseHeader: JWT.JWTResHead = {
        algorithm: 'RS256',
        expiresIn: '2h'
    }
    const JWTPayload: JWT.JWTpay = {
        iss: payload_iss
    }
    const TokenForJWT: string = jwt.sign(JWTPayload, privateToken, JWTResponseHeader)
    return {token: TokenForJWT, issID: payload_iss}
}

/*
*  Calls Kong Gateway API to create a consumer object along
*  with a subsequent call to assign the consumer with a JWT
*/
const CreateConsumer = async (email: string, uuid: string) => {
    try{
        await axios.post('http://localhost:8001/consumers/', {
            username: `${email}`
        })
        AddJWTForConsumer(email, uuid)
    } catch(error){
        console.log(error)
    }
}

const AddJWTForConsumer = async(email: string, uuid: string) => {
    try{
        await axios.post(`http://localhost:8001/consumers/${email}/jwt/`, {
                rsa_public_key: publicToken,
                algorithm: "RS256",
                key: uuid
        })
    } catch(error){
        console.log(error == firebase)
    }
}

/*
*  Endpoint to register a user on firebase and
*  consumer object ceation for kong supplmented
*  with a JWT
*/
AuthRouter.post('/register', (req: Request, res: Response) => {
    const {"token": JWT, "issID": UserUUID} = CreateJWTWithID()
    const email: JWT.RegisterParams = req.query.email
    const password = req.query.password
    CreateFirebaseUser(`${email}`, `${password}`)
    CreateConsumer(`${email}`, UserUUID)
    res.cookie('Clastics', JWT, {
       httpOnly: true
    })
    res.send('connection received')
    res.status(200)
})

/*
*  Endpoint to log user in and return cookie
*  with JWT
*/
AuthRouter.get('/login', (req: Request, res: Response) => {
    if(NonNullCredentials(req.query.email, req.query.password)){
        LogFirebaseUser(`${req.query.email}`, `${req.query.password}`)
        .then((LoginResult) => {
            if('user' in LoginResult){
                const {Result, ReturnValue} = HandleValidCredentials(LoginResult)
                if(Result){
                    res.cookie('Clastics', ReturnValue, {
                        httpOnly: true
                     })
                     res.send("Completed") 
                } 
                else{
                    res.send(ReturnValue)
                }
            }
            else{
                res.send(HandleInvalidCredentials(LoginResult).ReturnValue)
            }
        })
    }
    else{
        res.send(AuthenticationErrors.EmptyStringError)

    } 
    res.status(200)
})
