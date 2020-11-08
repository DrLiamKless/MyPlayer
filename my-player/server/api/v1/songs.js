const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Song, Artist, Interaction } = require('../../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

// Get all songs + search query
router.get('/', async (req,res) => {
    const songName = req.query.songName;
    const firstWordCondition = songName ? {songName: { [Op.like]: `${songName}%`} } : null;
    const otherWordsCondition = songName ? {songName: { [Op.like]: `% ${songName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null

    const allSongs = await Song.findAll({
        include: [Interaction, Artist],
        where: condition
    });
        res.json(allSongs);   
})

// Get top 20 songs
router.get('/top', async (req,res) => {
    const topSongs = await Song.findAll({
        include: [
            {
            model: Interaction,
            where: {isLiked: true}
            },
            {
            model: Artist,
            }
        ]
    });
        res.json(topSongs);   
})

// Get a specific song by id
router.get('/:id', async (req,res) => {
    const song = await Song.findByPk(req.params.id, {
        include: [Interaction, Artist]
    });
        res.json(song);   
})

// Insert song to songs:    
router.post('/add', async (req,res) => {
    const newSong = await Playlist.create(req.body)
         res.json(newSong)
 })

// update a song from songs
router.patch('/update/:id', async (req, res) => {
    const song = await Song.findByPk(req.params.id);
    await song.update(req.body);
    res.json(song)
  })

// new interaction - like/unlike:
router.post('/like/:id', async (req,res) => {
    const interaction = req.body;
    if(interaction.songId) {
        const newInteraction = await Interaction.create(interaction)
            res.json(newInteraction)
    } else {
        const updatedInteraction = await Interaction.update(interaction,{where: {songId: req.params.id}})
            res.json(updatedInteraction)
    }
})

// Delete a artist from artists
router.delete('/delete/:id', async (req,res) => {
    const song = await Song.findByPk(req.params.id)
    await song.destroy()
    res.json({deleted: true})
 })


module.exports = router;