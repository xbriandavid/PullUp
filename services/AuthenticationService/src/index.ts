import express from 'express'
import {AuthRouter} from "./routes/auth-routes"
import {auth} from 'express-openid-connect'
import {environmentConfig} from '../config'
import cors from 'cors'
const app = express();
const dotenv = require('dotenv')

dotenv.config()
app.use(cors())
app.use(auth(environmentConfig['CROSS-ORIGIN-CONFIG']))
app.use('/auth', AuthRouter)

app.listen(3000, () => {
    console.log("Sever now running...")
})