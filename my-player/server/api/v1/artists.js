const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Artist, Album, Song, Interaction } = require('../../models');

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


// Get all artists
router.get('/', async (req,res) => {
    const artistName = req.query.artistName;
    const firstWordCondition = artistName ? {artistName: { [Op.like]: `${artistName}%`} } : null;
    const otherWordsCondition = artistName ? {artistName: { [Op.like]: `% ${artistName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null


    const allArtists = await Artist.findAll({
        include: Album,
        where: condition     
    });
        res.json(allArtists);   
})

// Get top 20 artists
router.get('/top', (req,res) => {
    const sql = `
    SELECT artists.id AS id, artists.artist_name AS artistName, 
    artists.artist_cover_img AS artistCoverImg, SUM(play_count) AS countSum 
    FROM songs
    JOIN interactions
    ON songs.id = interactions.song_id
    JOIN artists ON songs.artist_id = artists.id
    GROUP BY artists.id ORDER BY countSum DESC LIMIT 20`
    db.query(sql, async (err, results) => {
        if (err) throw err;

        const idysCondition = []
        for (let i = 0; i < results.length; i++) {
            idysCondition.push({id: results[i].id });
        }

        const condition = { [Op.or]: idysCondition }

        const topArtists = await Artist.findAll({
        where: condition
    });
        res.json(topArtists);   
    })
})

// Get a specific artist by id
router.get('/:id', async (req,res) => {
    const artist = await Artist.findByPk(req.params.id, {
        include: [
            { model: Song, include: Interaction},   
            { model: Album } 
        ]
    });
        res.json(artist);   
})

// Insert artist to artists:
router.post('/add', async (req,res) => {
   const newArtist = await Artist.create (req.body)
        res.json(newArtist)
})

// update an artist from artists
router.patch('/update/:id', async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.update(req.body);
    res.json(artist)
  })

// Delete a artist from artists
router.delete('/delete/:id', async (req,res) => {
    const artist = await Artist.findByPk(req.params.id)
    await artist.destroy()
    res.json({deleted: true})
 })


module.exports = router;