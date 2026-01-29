const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect('mongodb+srv://adarshprajapatidev_db_user:NulF2TQGvIVd6Jxg@cluster0.juwsxgv.mongodb.net/db-1')
    .then(()=>console.log('Connecte to db '))
}

connectToDb()


app.listen(3000,()=>{
    console.log('Server is running on port 3000 | http://localhost:3000/')
})
