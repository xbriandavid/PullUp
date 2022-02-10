const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const model = require('./model')

const app = express()
const port = 5000


const place1 = new model.Boba({name:"TP Tea"})
const place2 = new model.Boba({name:"Tiger Sugar"})
app.use(express.json())
app.use(cors())

const uri = "mongodb+srv://xbd888:clastic@clastic-cluster.odxz5.mongodb.net/Clastic?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})

const connection = mongoose.connection

connection.on("open", function(){
    console.log("Connected to mongodb!")
})

app.post('/add', (req, res) => {
    const newEvent = new model.Event({title:"Park Event at San Jose", location:"San Jose, CA", places:[place1, place2]})
    newEvent._id = "00002"
    newEvent.save().then(() => res.send("event added")).catch((err) => res.send(err))
})

app.get('/data', (req, res) =>{
    Event.find({location:"Cupertino"}, (error, data) =>{
        if(error){
            res.send(error)
        } else{
            res.send(data)
        }
    })
})


app.get('/quit', (req, res) => {
    connection.close()
    .then((result) => {
        res.send("done")
    })
    .catch((err) => {
        console.log(err)
        res.send("there was an error closing the connection.")
    })
})

app.listen(port, () => console.log("server is running"))