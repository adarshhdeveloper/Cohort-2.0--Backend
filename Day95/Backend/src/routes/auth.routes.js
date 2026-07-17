const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

//creating router 
const authRouter = express.Router()

//register auth
authRouter.post('/register', async (req, res) => {
    const {
        email,
        password
    } = req.body

    //cheak for  user existence 
    const isUserAlreadyExists = await userModel.findOne({email})
    if (isUserAlreadyExists) {
        return res.status(409).json({
            msg: 'user already exists'
        })
    }
    //password hashing
    const hash = crypto.createHash('md5').update(password).digest('hex')

    //user Creating 
    const user = await userModel.create({
        email,
        password:hash
    })

    //token genaration 
    const token = jwt.sign({
        user:user._id
      },
      process.env.JWT_SECRET
    )
    
    //storing user in cookie storage 
    res.cookie('jwt_token',token)
    res.status(201).json({
        msg: 'user register successfully',
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

//user login 
authRouter.post('/login',async (req,res)=>{
    const {email , password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            msg:'user not found'
        })
    }
    //password chaek
    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')
    if(!isPasswordMatched){
        return res.status(401).json({
            msg:'invalid password '
        })
    }

    //token sign 
    const token = jwt.sign({
        user : user._id
      },
      process.env.JWT_SECRET
   )
   res.cookie('jwt_token',token)

   res.status(200).json({
    msg:'login successfull',
    token
   })
})

//user logout 
authRouter.post('/logout',(req,res)=>{

    res.clearCookie('jwt_token')

    res.status(200).json({
        msg:'logout successfull'
    })
})

module.exports = authRouter