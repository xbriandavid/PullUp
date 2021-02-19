
import express, {Request, Response} from "express"
export const itemrouter = express.Router()

itemrouter.get('/', (req: express.Request, res:express.Response) => {
    res.send("this is the response!!")
})

