require('dotenv').config()
const app = require('./src/app')
const connetToDb = require('./src/config/dataBase')


connetToDb()
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})