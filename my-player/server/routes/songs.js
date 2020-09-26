const express = require("express");
const router = express.Router();
const db = require('../connection')
const { Song, Artist, Interaction } = require('../models');
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
router.post('/likeButton', (req,res) => {
    const newInteraction = req.body;
    if(newInteraction.is_liked == null) {
        newInteraction.is_liked = 1;
        const sql = 'INSERT INTO interactions SET ?';
        db.query(sql, newInteraction, (err, result) => {
            if (err) throw (err);
            res.json(result)
        })    
    } else {
        const sql = `UPDATE interactions SET is_liked = ${newInteraction.is_liked}
        WHERE songId = '${newInteraction.songId}'`;
        db.query(sql, (err, result) => {
            if (err) throw (err);
            res.json(result)
        })    
    }
})

// Delete a artist from artists
router.delete('/delete/:id', async (req,res) => {
    const song = await Song.findByPk(req.params.id)
    await song.destroy()
    res.json({deleted: true})
 })


module.exports = router;