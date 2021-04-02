import express, {Request, Response} from "express"
import {environmentConfig} from '../../config'
import firebase from 'firebase';
export const itemrouter = express.Router()
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const admin = require('firebase-admin')
const cookieParser = require('cookie-parser')
const privateTok = fs.readFileSync("/Users/fetch/Projects/Pull-up/PullUp/services/test-service/src/private.pem", {encoding: "utf8"})


// JWT Creation method
const CreateJWT = () =>{
    const JWTResponseHeader: JWT.JWTResHead = {
        algorithm: 'RS256',
        expiresIn: '2h'
    }
    const JWTPayload: JWT.JWTpay = {
        iss: `${uuid.v4()}`
    }
    const token = jwt.sign(JWTPayload, privateTok, JWTResponseHeader)
    return token
}

// Callback to create a Firebase user
const CreateFirebaseUser = (email: string, password: string):void => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => console.log(error))
}


itemrouter.get('/register', (req: Request, res: Response) => {
    res.send(CreateJWT())
    res.status(200)
})

