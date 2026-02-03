const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect('mongodb+srv://adarshprajapatidev_db_user:NulF2TQGvIVd6Jxg@cluster0.juwsxgv.mongodb.net/notes2')
    .then(()=>{
        console.log("Connected to db ")
    })
}

module.exports = connectToDb