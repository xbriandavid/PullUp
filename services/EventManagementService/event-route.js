const express = require('express')
const router = express.Router()
let Event = require("./model")
router.post('/add', (req, res) => {
    const newEvent = new Event({location:"Cupertino"})
    newEvent.save().then(() => res.send("event added")).catch((err) => res.send(err))
})

module.exports = router