import express, {Request, Response} from "express"
export const itemrouter = express.Router()

itemrouter.get('/', (req: Request, res:express.Response) => {
    res.json({
        payload: 30,
        payload2:50
    })
})

