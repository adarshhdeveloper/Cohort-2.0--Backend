const userModel = require("../models/user.model")
const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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
            msg: "user with this email already exists"
        })
    }
    const hash = crypto.createHash('md5').update(password).digest('hex')
    const user = await userModel.create({
        name,
        email,
        password:hash
    })
    const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    //storing the jwt_token in cookie storage 
    res.cookie('jwt_token', token)

    res.status(201).json({
        msg: "user registerd successfully",
        user,
        token
    })
})
//fetching user details 
authRouter.get('/register', async (req, res) => {
    const users = await userModel.find()

    res.status(200).json({
        msg: "registered user's detail",
        users
    })
})

//login user  controller 
authRouter.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body

    //chek user exist or not 
    const user = await userModel.findOne({
        email
    })
    if (!user) {
        return res.status(404).json({
            msg: 'user not exist with this mail'
        })
    }
    //check password is valid or not 
    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

    if (!isPasswordMatched) {
        return res.status(401).json({
            msg: "Invalid password"
        })
    }

    //signing jtw token 
     const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET
    )
    // storing jtw sign in cookie 
    res.cookie('jwt_token',token)

    res.status(200).json({
        msg:'login successfull',
        token
    })


})


module.exports = authRouter