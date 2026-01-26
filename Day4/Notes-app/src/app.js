import express from 'express'

const app = express()
app.use(express.json())

const notes =[]

app.post('/notes',(req,res)=>{
    notes.push(req.body)
})

app.get('/notes',(req,res)=>{
    res.send("note added")
    
})


export default app 