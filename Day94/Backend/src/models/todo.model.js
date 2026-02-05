const mongoose = require('mongoose')

//Schema Creation 

const todoSchema = new mongoose.Schema({
    desc : String
})

//modle creation 

const todoModel = mongoose.model('todo',todoSchema)

module.exports = todoModel