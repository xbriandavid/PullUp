const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const app = express()
const port = 5000

const uri = "mongodb+srv://xbd888:clastic@clastic-cluster.odxz5.mongodb.net/Clastic?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true})

const connection = mongoose.connection

connection.on("open", function(){
    console.log("Connected to mongodb!")
})

app.listen(port, () => console.log("server is running"))