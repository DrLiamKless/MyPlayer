const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { User } = require('../../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken')

// Get all users:    
router.get('/', async (req,res) => {
    const allUsers = await User.findAll();
        res.json(allUsers);   
})

// login:

router.post('/login', async (req, res) => {
    console.log('searching....');
    let user = await User.findOne ({ where: {email: req.body.email}})
    if (!user) {
        console.log('email not match');
        return res.status(500).send('email dose not match any user')
    }
    try {
        // authentication :
        if (user.password === req.body.password) {
            console.log('password match');
            user = user.toJSON();
        // jwt:
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10h'})
        return res.json({success: true, userName: user.userName, accessToken: accessToken})
        }
    } catch {
        console.log('something went wrong');
        res.status(500).send()
    }
})

// Insert user to users:    
router.post('/add', async (req,res) => {
    const newUser = await User.create(req.body)
         res.json(newUser)
 })

module.exports = router;