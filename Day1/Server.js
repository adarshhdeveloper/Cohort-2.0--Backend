const express =require('express')

const app =express()
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.get("/home",(req ,res)=>{
    res.send("Home Page")
})

app.listen(3000)