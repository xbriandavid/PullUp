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
    EmailNotRegistered: "auth/no-record",
    PasswordUnkown: "auth/incorrect-password",
    GenericError: "auth/gen-error"
}

const CreateFirebaseUser = async (email: string, password:any) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log(error))
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
        console.log(error)
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
    const email: JWT.RegisterParams = req.query.email
    const password = req.query.password
    firebase.auth().signInWithEmailAndPassword(`${email}`, `${password}`)
    .then((userCredential: any) => {
        const {"token": JWT, "issID": UserUUID} = CreateJWTWithID()
        AddJWTForConsumer(`${email}`, UserUUID)
        res.cookie('Clastics', JWT, {
            httpOnly: true
         })
        res.send("Authentication successful")
        res.status(200)
    })
    .catch((error) => {
        if(error.code == "auth/user-not-found"){
            res.send(AuthenticationErrors.EmailNotRegistered)
        }
        else if (error.code == "auth/wrong-password"){
            res.send(AuthenticationErrors.PasswordUnkown)
        }
        else{
            res.send(AuthenticationErrors.GenericError)
        }
        res.status(401)
    })
})

