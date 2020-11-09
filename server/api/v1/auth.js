const express = require("express");
const router = express.Router();
const { User } = require('../../models');
const jwt = require('jsonwebtoken')
const authenticateToken = require('../../middlewares/auth')

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
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
        return res.json({success: true, userName: user.userName, accessToken: accessToken})
        }
    } catch {
        console.log('something went wrong');
        res.status(500).send()
    }
})

 // Validate Token
 router.get("/validateToken", authenticateToken, (req, res) => {
    res.json({ valid: true })
  })

  module.exports = router;