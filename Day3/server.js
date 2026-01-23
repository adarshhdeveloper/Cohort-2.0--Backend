const express = require('express')


const app = express()
const notes =[]

app.use(express.json())

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.send("Notes created ")
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.listen(3000,()=>{
    console.log("Server is runnig at 3000 port...")
})