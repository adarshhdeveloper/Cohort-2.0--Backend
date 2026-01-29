const express = require("express")
const noteModel = require("./models/notes.model")

const app = express()
app.use(express.json())

//note creation 
app.post('/notes', async(req,res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message : "Note created succesfully",
        noteModel
    })
    
})


//note fetching 
app.get('/notes', async(req,res)=>{
    const notes= await noteModel.find()

    res.status(200).json({
        message : "Notes fetched succesfully",
        notes
    })

})

module.exports = app