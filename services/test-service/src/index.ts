import express from 'express';
import {itemrouter} from"./routes/test-routes"
const app = express();
const port = 8000


app.use("/", itemrouter)

app.listen(port, function(){
    console.log("listening on port 8000")
})