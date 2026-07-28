const express = require('express')
const notemodel = require('./models/notes.model')
const cors =require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

//adding daata in notes 
app.post('/notes',async(req,res)=>{
    const {title,desc} = req.body
    const note = await notemodel.create({
        title,
        desc
    })
    res.status(201).json({
        msg:"Notes creates succssesfully",
        notemodel
    })
})

//notes display 
app.get('/notes', async(req,res)=>{
    const notes =  await notemodel.find()

    res.status(200).json({
        msg: "Notes fetched successfully",
        notes
    })
})

//delte notes

app.delete('/notes/:id', async (req,res)=>{
    const id = req.params.id
    await notemodel.findByIdAndDelete(id)

    res.status(200).json({
        msg:'note deleted successfully'
    })
})

//updating Notes 
app.put('/notes/:id', async (req,res)=>{
    const {title,desc} = req.body
    const id = req.params.id

    await notemodel.findByIdAndUpdate(id,{title , desc})

    res.status(200).json({
        msg:"Notes Update successfully"
    })

})

//single filed Update in note
app.patch('/notes/:id',async (req,res)=>{
    const id = req.params.id
    const {desc} = req.body

    await notemodel.findByIdAndUpdate(id,{desc})

    res.status(200).json({
        msg:"Description Updated"
    })

})

//wild card Route 
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
   
})

module.exports = app



// Lest Start learning Again 
