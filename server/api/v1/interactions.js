const express = require("express");
const router = express.Router();
const { Interaction } = require('../../models');


router.get('/', async (req, res) => {
  try{
    const allInteractions = await Interaction.findAll({});
    res.json(allInteractions);   
  } catch (err ) {
    res.send("error occures")
  }
})

router.get('/song/:songId/user/:userId', async (req, res) => {

  try{
    const allInteractions = await Interaction.findAll({
      where: 
      {
        songId: req.params.songId,
        userId: req.params.userId
      }
    });
    res.json(allInteractions);   
  } catch (err) {
    res.send("error occures")
  }
})

  module.exports = router;