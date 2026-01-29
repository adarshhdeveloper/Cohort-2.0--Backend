const express = require('express')


const notes = []
const app = express() 
app.use(express.json())

//server check route
app.get('/',(req,res)=>{
    // res.status(200).json({message:"Server is running"})
    res.status(200).send('Server is running ...')
})

//creating  notes 
app.post('/notes', (req, res) => {
    notes.push(...req.body)
    res.status(201).send('Notes created')

})
//GET notes

app.get('/notes', (req, res) => {
    res.status(200).send(notes)
})

//Deleting Notes 
//Using index.params
// req.params.index
app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.status(204).send('note Deleted')
})

//note update 
// partial update 
// data req.body ke andar hoga 

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description= req.body.description
    res.status(201).send("Note updated")
})

//update hole field 
app.put('/notes/:index', (req, res) => {
    notes[req.params.index] = req.body
    res.status(201).send("Note Updated")
})

module.exports = app