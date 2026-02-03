const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    description : String,
})

const noteModel = mongoose.model("notes",noteSchema)

module.exports = noteModel