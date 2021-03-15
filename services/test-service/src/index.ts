import express, {Request, Response} from 'express';
import cors from 'cors'
import {itemrouter} from "./routes/test-routes"
import {auth} from 'express-openid-connect'
import firebase from 'firebase';
import * as admin from 'firebase-admin'
import {environmentConfig} from '../config'
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = 3000

admin.initializeApp({credential: admin.credential.cert(environmentConfig['FIREBASE-CONFIG'])})


firebase.initializeApp(environmentConfig['FIREBASE-CONFIG'])
const additionalClaims = {"registered": true}

const callback = (req:Request, res:Response):void => {
  firebase.auth().createUserWithEmailAndPassword('a99@gmail.com', 'testPass')
  .catch((error) => console.log(error))

  admin.auth().createCustomToken("fakeEmailAccount@gmail.com", additionalClaims)
    .then((jwt:any) => {res.send(`YOUR TOKEN: ${jwt}`)})
    .catch((error:any) => {console.log(error)})
  
  res.status(200)
}

app.use(cors())
app.use(auth(environmentConfig['CROSS-ORIGIN-CONFIG']))

app.use('/thisatest', itemrouter)
app.get('/practice',  callback)
app.get('/test', (req:Request, res:Response) => {
  res.json({
    "type":"RESPONSE!"
  })
  res.status(200)
})

app.listen(port, function(){
    console.log("listening on port 3000")
})


