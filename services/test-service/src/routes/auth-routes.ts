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
    Registration_InvalidEmail: "auth/invalid-email",
    Registration_WeakPassword: "auth/weak-password",
    GenericError: "auth/gen-error",
}
const AuthSuccess = {
    Success: "auth/successful"
}
// 'auth/email-already-in-use'


const NonNullCredentials = (email: JWT.RegisterParams, password: JWT.RegisterParams) => {
    const NonNullInputs = (email != null) && (password != null)
    const NonEmptyStrings = (`${email}`.length > 0) && (`${password}`.length > 0)
    return NonNullInputs && NonEmptyStrings
}

// turn into try and catch !
const CreateFirebaseUser = async (email: string, password: string): Promise<firebase.FirebaseError|firebase.auth.UserCredential> => {
    const a = await firebase.auth().createUserWithEmailAndPassword(email, password) 
                    .then((response) =>{
                        return response
                    }) 
                    .catch((error) => {
                        return error
                    })
    return a
}

const LogFirebaseUser = async(email: string, password: string):Promise<firebase.FirebaseError|firebase.auth.UserCredential> => {
    const result = await firebase.auth().signInWithEmailAndPassword(`${email}`, `${password}`)
                    .then((credentials:firebase.auth.UserCredential) => {
                        return credentials
                    })
                    .catch((error: firebase.FirebaseError) => {
                        return error
                    })
    return result
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
const CreateConsumer = async (email: string) => {
    let result: boolean = await axios.post('http://localhost:8001/consumers/', {
        username: `${email}`
    })
    .then((response: any) => {
        return true
    }).catch((response: any) => {
        return false
    })
    return result
}

const AddJWTForConsumer = async (email: string, uuid: string) => {
    let result:boolean = await axios.post(`http://localhost:8001/consumers/${email}/jwt/`, {
                rsa_public_key: publicToken,
                algorithm: "RS256",
                key: uuid
    }).then((response: any) => {
        return true
    }).catch((response: any) => {
        return false
    })
    return result
}


const ValidateNewAccount = async (email: JWT.RegisterParams, res: Response): Promise<kong.KongAPIResult> => {
    const {"token": JWT, "issID": UserUUID} = CreateJWTWithID()
    const ValidateCreateConsumer = await CreateConsumer(`${email}`)
                        .then((CreateSuccess) => {
                            if(!(CreateSuccess)){
                                return {result: AuthenticationErrors.GenericError}
                            }
                            return {result: JWT}
                        })
    
    if(ValidateCreateConsumer['result'] == AuthenticationErrors.GenericError){
        return {result: AuthenticationErrors.GenericError}
    }   

    const ValidateJWTForConsumer = await AddJWTForConsumer(`${email}`, UserUUID)
                                        .then((JWTSuccess) =>{
                                            if(!(JWTSuccess)){
                                                return {result: AuthenticationErrors.GenericError}
                                            }
                                            return {result: JWT}
                                        })
                                        .catch((e) => {
                                            return {result: e}
                                        })
    if(ValidateJWTForConsumer['result'] != JWT){
        return {result: AuthenticationErrors.GenericError}
    }
    else{
        return {result: ValidateJWTForConsumer['result']}
    }
}

const ValidateExistingAccount = async (email: JWT.RegisterParams, res: Response): Promise<kong.KongAPIResult> => {
    const {"token": JWT, "issID": UserUUID} = CreateJWTWithID()
    const ValidateLogin = await AddJWTForConsumer(`${email}`, UserUUID)
                        .then((JWTSuccess) =>{
                            if(!(JWTSuccess)){
                                return {result: AuthenticationErrors.GenericError}
                            }
                            return {result: JWT}
                        })
                        .catch((e) => {
                            return {result: e}
                        })
    return ValidateLogin
}

const ValidateAccount = async (email: JWT.RegisterParams, password: JWT.RegisterParams, res: Response) => {
    const FirebaseSuccess = await LogFirebaseUser(`${email}`, `${password}`)
                        .then((result) => {
                            if(!('user' in result)){
                                return {result: false, msg: result['code']}
                            }
                            return {result: true, msg: "success"}
                        })
                        .catch((result) => {
                            return {result: false, msg: AuthenticationErrors.GenericError}
                        })
    if(!(FirebaseSuccess['result'])){
        res.send(FirebaseSuccess['msg'])
        return
    }
    const KongVerifyUser = await ValidateExistingAccount(`${email}`, res)
                                .then((result: kong.KongAPIResult) => {
                                    if(result['result'] == AuthenticationErrors.GenericError){
                                        return {result: false, msg: AuthenticationErrors.GenericError}
                                    }
                                    res.cookie('Clastics', result['result'], {
                                        httpOnly: true
                                    })
                                    res.send(AuthSuccess.Success)
                                    return {result: true, msg: "success"}
                                })
                                .catch(() => {
                                    return {result: false, msg: AuthenticationErrors.GenericError}
                                })
    if(!(KongVerifyUser['result'])){
        return KongVerifyUser['msg']
    }
}

const CreateAccount = async (email: JWT.RegisterParams, password: JWT.RegisterParams, res: Response) => {
    const FirebaseSuccess = await CreateFirebaseUser(`${email}`, `${password}`)
                                .then((result) => {
                                        if(!('user' in result)){
                                            return {result: false, msg: result['code']}
                                        }
                                        return {result: true, msg: "success"}
                                    })
                                    .catch((result) => {
                                        return {result: false, msg: AuthenticationErrors.GenericError}
                                    })
    if(!(FirebaseSuccess['result'])){
        res.send(FirebaseSuccess['msg'])
        return
    }

    
    const KongUserAddSuccess = await ValidateNewAccount(`${email}`, res)
                                .then((result: kong.KongAPIResult) => {
                                    if(result['result'] == AuthenticationErrors.GenericError){
                                        return {result: false, msg: AuthenticationErrors.GenericError}
                                    }
                                    res.cookie('Clastics', result['result'], {
                                        httpOnly: true
                                    })
                                    res.send(AuthSuccess.Success)
                                    return {result: true, msg: "success"}
                                })
                                .catch(() => {
                                    return {result: false, msg: AuthenticationErrors.GenericError}
                                })

    if(!(KongUserAddSuccess['result'])){
        return KongUserAddSuccess['msg']
    }
}
/*
*  Endpoint to register a user on firebase and
*  consumer object ceation for kong supplmented
*  with a JWT
*/

AuthRouter.post('/register', (req: Request, res: Response) => {
    if(! NonNullCredentials(req.query.email, req.query.password)){
        res.send(AuthenticationErrors.EmptyStringError)
        return
    }
    CreateAccount(req.query.email, req.query.password, res)
    .then()
    .catch((result) => res.send(result))
})

AuthRouter.get('/login', (req: Request, res: Response) => {
    if(! NonNullCredentials(req.query.email, req.query.password)){
        res.send(AuthenticationErrors.EmptyStringError)
        return
    }
    ValidateAccount(req.query.email, req.query.password, res)
    .then()
    .catch((result) => res.send(result))
})
