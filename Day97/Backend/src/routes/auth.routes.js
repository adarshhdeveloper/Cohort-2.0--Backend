const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

//register user
authRouter.post('/register', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            msg: "With this email user already exists"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    //token creation 
    const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )
    //store token in users browser 

    res.cookie("jwt_token",token)
    
    res.status(200).json({
        msg: 'user registerd',
        user,
        token
    })

})

//fetch user 
authRouter.get('/register', async (req, res) => {
    const users = await userModel.find()

    res.status(200).json({
        msg: 'users fetched successfully',
        users
    })
})

module.exports = authRouter