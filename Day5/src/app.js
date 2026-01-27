/* 
=> server creation  
=> server config
*/
const express =require('express')
let notes =[]

const app = express() //server intance 
 
app.use(express.json()) 

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("Notes Created")
   

})
app.patch("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("Notes Updated")
})
app.put("/note",(req,res)=>{
    res.send("put method")
    
})
app.get("/notes",(req,res)=>{
    res.send("Notes Recived")
    console.log(notes)
    
})

module.exports = app


