const express = require("express");
const router = express.Router();
const { Interaction } = require('../../models');


router.get('/', async (req, res) => {
    const allInteractions = await Interaction.findAll({});
    res.json(allInteractions);   
})

router.get('/song/:songId/user/:userId', async (req, res) => {
  const allInteractions = await Interaction.findAll({
    where: 
    {
      songId: req.params.songId,
      userId: req.params.userId
    }
  });
  res.json(allInteractions);   
})

  module.exports = router;