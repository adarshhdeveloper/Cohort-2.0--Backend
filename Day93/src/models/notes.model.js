const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title : String,
    desc : String
})

//creating modles 

const notemodel = mongoose.model('notes',noteSchema)

module.exports = notemodel