import express, {Request, Response} from "express"
import firebase from 'firebase';
export const itemrouter = express.Router()
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const axios = require('axios')
const publicToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/public.pem", {encoding: "utf8"})
const privateToken = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", {encoding: "utf8"})

const CreateFirebaseUser = (email: string, password:any):void => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log(error))
}

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

const CreateConsumer = (email: string, uuid: string) => {
    axios.post('http://localhost:8001/consumers/', {
        username: `${email}`
    }).then((response: any) => { 
        axios.post(`http://localhost:8001/consumers/${email}/jwt/`, {
            rsa_public_key: publicToken,
            algorithm: "RS256",
            key: uuid
        })}
    ).catch((error: any) => {
        console.log(error)
    })
}

/*
* Creates a JWT token.
* Creates a firebase user instance. Token creation returns
* an object that contains a uuid used to verify an account
* on Kong Gateway consumers
*/
itemrouter.get('/register', (req: Request, res: Response) => {
    const {"token": JWT, "issID": UserUUID} = CreateJWTWithID()
    const email: JWT.RegisterParams = req.query.email
    const password = req.query.password
    CreateFirebaseUser(`${email}`, `${password}`)
    CreateConsumer(`${email}` ,UserUUID)
    res.cookie('Clastics', JWT, {
       httpOnly: true
    })
    res.send('connection received')
    res.status(200)
})
