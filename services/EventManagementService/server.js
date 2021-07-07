const express = require('express')
const mongoose = require('mongoose')
const router = require('./event-route')

const app = express()
const port = 5000

app.use(express.json())
app.use('/e', router)
const uri = "mongodb+srv://xbd888:clastic@clastic-cluster.odxz5.mongodb.net/Clastic?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})

const connection = mongoose.connection

connection.on("open", function(){
    console.log("Connected to mongodb!")
})

app.get('/quit', (req, res) => {
    connection.close()
    .then((result) => {
        console.log(result)
        res.send("done")
    })
    .catch((err) => {
        console.log(err)
        res.send("there was an error closing the connection.")
    })
})

app.listen(port, () => console.log("server is running"))