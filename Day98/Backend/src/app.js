const express = require('express')
const authRouter = require('./routes/auth.route')
const cookirParser = require('cookie-parser')


const app = express()

//middlewares
app.use(express.json())
app.use(cookirParser())
// routes
app.use('/api/auth',authRouter)

module.exports =app