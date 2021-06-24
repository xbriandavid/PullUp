import express from 'express'
import {AuthRouter} from "./routes/auth-routes"
import {auth} from 'express-openid-connect'
import {environmentConfig} from '../config'
import cors from 'cors'
import firebase from 'firebase';
import * as admin from 'firebase-admin'
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config()

admin.initializeApp({credential: admin.credential.cert(environmentConfig["FIREBASE-ADMIN-CONFIG"])})
firebase.initializeApp(environmentConfig['FIREBASE-CONFIG'])

app.use(cors())
app.use(cookieParser())
app.use(auth(environmentConfig['CROSS-ORIGIN-CONFIG']))
app.use('/auth', AuthRouter)

app.listen(3000, () => {
    console.log("Sever now running...")
})