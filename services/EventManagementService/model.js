const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BobaSchema = new Schema({
    name: {type: String}
})

const EventSchema = new Schema({
    _id: {type: Number},
    title: {type: String, default:'No event'},
    location: {type: String, default:'No location'},
    places: {type: [BobaSchema], default: undefined}
})

module.exports.Event =  mongoose.model("Event", EventSchema)
module.exports.Boba = mongoose.model("Boba", BobaSchema)

