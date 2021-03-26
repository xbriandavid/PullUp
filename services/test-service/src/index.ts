import express, {Request, Response} from 'express'
import {itemrouter} from "./routes/test-routes"
import {auth} from 'express-openid-connect'
import {environmentConfig} from '../config'
import cors from 'cors'
import firebase from 'firebase';
import * as admin from 'firebase-admin'
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const pemFile = require('./private.pem')

dotenv.config()

admin.initializeApp({credential: admin.credential.cert(environmentConfig["FIREBASE-ADMIN-CONFIG"])})
firebase.initializeApp(environmentConfig['FIREBASE-CONFIG'])
const additionalClaims = {"registered": true}
const callback = (req:Request, res:Response):void => {
  //firebase.auth().createUserWithEmailAndPassword('a99@gmail.com', 'testPass')
  //.catch((error) => console.log(error))

  admin.auth().createCustomToken(`${uuid.v4()}`, additionalClaims)
    .then((jwt:any) => {res.send(`YOUR TOKEN: ${jwt}`)})
    .catch((error:any) => {console.log(error)})
  
  res.status(200)
}

const jwtToken =(req: Request, res: Response) => {
  var token: any = jwt.sign('example',pemFile, {algorithm: 'RS256'})
  res.send(token)
  res.status(200)
}

app.use(cors())
app.use(cookieParser())
app.use(auth(environmentConfig['CROSS-ORIGIN-CONFIG']))

app.use('/thisatest', itemrouter)
app.get('/practice',  jwtToken)
app.get('/test', (req:Request, res:Response) => {
  res.cookie('TEST-COOKIE', '1234', {
    httpOnly: true
  })
  res.status(200)
})
app.get('/cookieTester', (req:Request, res:Response) => {
  console.log(req)
  res.send("cookieTester")
  res.status(200)
})

app.listen(3000, function(){
    console.log("listening on port 3000")
})


