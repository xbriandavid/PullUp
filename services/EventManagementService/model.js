const mongoose = require('mongoose')

const Schema = mongoose.Schema


const EventSchema = new Schema({
    title: {type: String, default:'No event'},
    location: {type: String, default:'No location'},
})

const Event = mongoose.model("Event", EventSchema)
module.exports = Event