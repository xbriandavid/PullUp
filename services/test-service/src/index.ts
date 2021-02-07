import express from 'express'

const app = express()
const port = 8000

app.get("/", function(req, res){
    res.send('Server response')
})

app.listen(port, function(){
    console.log("listening on port 8000")
})