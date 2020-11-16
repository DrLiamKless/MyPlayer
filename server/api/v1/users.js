const express = require("express");
const router = express.Router();
const { User } = require('../../models');


// Get all users:    
router.get('/', async (req,res) => {
    const allUsers = await User.findAll();
        res.json(allUsers);   
})

// get specific user;
router.get('/id/:id', async (req,res) => {
    const userId = req.params.id

    const user = await User.findOne({where: {id: userId }});
        res.json(user);   
})

// Insert user to users:    
router.post('/add', async (req,res) => {
    const regsitrationData = req.body;

    // userRegisterationData.password = await bcrypt.hash(userRegisterationData.password, 10); //:todo add hash

    try {
        const newUser = await User.create(regsitrationData)
        res.json(newUser)
    } catch(err) {
        res.status(500).json({ error });
    }
 })

module.exports = router;