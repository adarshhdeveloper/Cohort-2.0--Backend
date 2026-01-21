const express = require('express')

const app = express() // server instance 

//routes
app.get('/',(req,res)=>{
    res.send("Heloow")
})

app.get('/about',function(req,res){
    res.send("This is About page ")
})
app.listen(3000)