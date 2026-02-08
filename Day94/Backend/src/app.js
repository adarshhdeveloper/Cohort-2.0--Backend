const express = require('express')
const todoModel = require('./models/todo.model')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

//creating todo
app.post('/api/todo',async (req,res)=>{

    const {desc} = req.body
    await todoModel.create({
        desc
    })
    res.status(201).json({
        msg:'Todo list  created '
    })
})

//fetching todo 
app.get('/api/todo', async (req,res)=>{
    const todoList = await todoModel.find()

    res.status(200).json({
        msg:"Todo list fetched successfully",
        todoList
    })
})

//updating todo list 

app.patch('/api/todo/:id', async (req,res)=>{
    const {desc} = req.body
    const id =req.params.id
    await todoModel.findByIdAndUpdate(id,{desc})

    res.status(200).json({
        msg:'Todo list updated successfully'
    })
})

//Deleting Todo list 
app.delete('/api/todo/:id',async (req,res)=>{
    const id = req.params.id
    await todoModel.findByIdAndDelete(id)

    res.status(200).json({
        msg:"Todo list deleted successfully"
    })
})

module.exports = app
