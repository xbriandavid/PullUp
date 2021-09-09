const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const router = require('./event-route')

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

/*
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
*/
app.get('/fakedata', (req,res) => {
    res.json({
        Title: "Family Meetup",
        Date: "07/18/21",
        LastAccess: "07/17/21",
        NumberOfEntries: 5,
        Meta: {
            Created: "Jul. 12, 2021, 4:40 PM",
            NumberOfEntries: 2,
            Modified: "Dec. 2, 2021, 11:20 AM"
        }
    })
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