const express = require("express");
const router = express.Router();
const { User } = require('../../models');


// Get all users:    
router.get('/', async (req,res) => {
    const allUsers = await User.findAll();
        res.json(allUsers);   
})

// Insert user to users:    
router.post('/add', async (req,res) => {
    const newUser = await User.create(req.body)
         res.json(newUser)
 })

module.exports = router;