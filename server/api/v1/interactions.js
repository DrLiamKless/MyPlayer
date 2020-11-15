const express = require("express");
const router = express.Router();
const { Interaction } = require('../../models');


// login:
router.get('/', async (req, res) => {
    const allInteractions = await Interaction.findAll({});
    res.json(allInteractions);   
})

  module.exports = router;