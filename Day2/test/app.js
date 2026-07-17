const express = require('express')
const app = express() // server instance

app.get('/',(req,res)=>{
    res.send("Heloow00000000000000000000000")
})
app.get('/about',function(req,res){
    res.send("This is About page ")
})  

module.exports = app