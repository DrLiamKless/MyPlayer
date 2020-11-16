const express = require("express");
const router = express.Router();
const { User, refresh_token } = require('../../models');
const jwt = require('jsonwebtoken')
const authenticateToken = require('../../middlewares/auth')

// helpers:

const generateToken = async (userInfo) => 
  jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });

// login:
router.post('/login', async (req, res) => {
    const loginData = req.body

    let user = await User.findOne ({ where: {email: loginData.email}})
    if (!user) {
        return res.status(404).send('email dose not match any user')
    }
    try {
        // authentication :
        if (user.password === loginData.password) {
            user = user.toJSON();
        // jwt:

        const expiresIn = loginData.rememberMe ? "365 days" : "24h"
        const infoForCookie = {
            userId: user.id,
            email: user.email,
        };

        const refreshToken = jwt.sign(
            infoForCookie,
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: expiresIn}
        );

        const existingRefreshToken = await refresh_token.findOne({ where: {userId: user.id} });

        if (existingRefreshToken) {
            await existingRefreshToken.update({refreshToken: refreshToken})
        } else {
            const newRefreshToken = await refresh_token.create({
                userId: user.id,
                token: refresh_token,
            })    
        }


        const accessToken = await generateToken(infoForCookie);
        res.cookie('accessToken', accessToken);
        res.cookie('refresh_token', refresh_token);
        res.cookie('id', user.id);
        res.status(200).send({success: true, userName: user.userName, accessToken: accessToken}); 
        } else {
            res.status(403).send("User or password is incorrect");
        }
    } catch (err) {
        res.status(500).send()
    }
})

 // Validate Token
 router.get("/validateToken", authenticateToken, (req, res) => {
     try {
         res.json({ valid: true })
     } catch (err) {
         res.json({valid:false});
     }
  })

  module.exports = router;