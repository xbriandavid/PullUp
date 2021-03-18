import express, {Request, Response} from 'express';
import cors from 'cors'

const API_Gateway = express()

API_Gateway.listen(3000, () => {
    console.log("API_GATEWAY")
})