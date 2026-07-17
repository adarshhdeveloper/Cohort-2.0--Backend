const express =require('express')
const catME = require('./index')

const app =express()
app.get("/", (req, res) => {
  res.send("Server running 🚀");
  catME()
});

app.get("/home",(req ,res)=>{
    res.send("Home Page")
    catME()
})

app.listen(3000)