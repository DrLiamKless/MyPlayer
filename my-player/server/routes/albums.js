const express = require("express");
const router = express.Router();
const db = require('../connection')
const { Artist, Album, Song } = require('../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


// Get all albums + search query
router.get('/', async (req,res) => {
    const albumName = req.query.albumName;
    const firstWordCondition = albumName ? {albumName: { [Op.like]: `${albumName}%`} } : null;
    const otherWordsCondition = albumName ? {albumName: { [Op.like]: `% ${albumName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null


    const allAlbums = await Album.findAll({ 
        include: [Artist],
        where: condition
    })
        res.json(allAlbums);   
})

// Get top 20 albums - for now its 2
router.get('/top', (req,res) => {
    const sql = `
    SELECT albums.id AS id, albums.artist_id AS artistId, album_name AS albumName,
    album_cover_img AS albumCoverImg,  artist_cover_img AS artistCoverImg, playsSum 
    from 
    (albums INNER JOIN artists ON albums.artist_id = artists.id)
	LEFT JOIN
    (SELECT album_id, SUM(play_count) AS playsSum FROM myplayer.songs AS s 
    LEFT JOIN 
    myplayer.interactions AS i ON s.song_id = i.song_id 
    GROUP BY album_id) 
    AS sumTable ON albums.id = sumTable.album_id ORDER BY playsSum DESC LIMIT 20`
    db.query(sql, async (err, results) => {
        if (err) throw err;

        const idysCondition = []
        for (let i = 0; i < results.length; i++) {
            idysCondition.push({id: results[i].id });
        }

        const condition = { [Op.or]: idysCondition }

        const topAlbums = await Album.findAll({
        include: [Song, Artist],
        where: condition
    });
        res.json(topAlbums);  
    })
})

// Get a specific album by id
router.get('/:id', async (req,res) => {
    const album = await Album.findByPk(req.params.id, {
        include: [Song, Artist]
    });
        res.json(album);   
})

// Insert album to albums:
router.post('/add', async (req,res) => {
    const newAlbum = await Album.create (req.body)
         res.json(newAlbum)
 })

 //update an album from albums
router.patch('/update/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.update(req.body);
    res.json(album)
  })

// Delete a album from albums
router.delete('/delete/:id', async (req,res) => {
    const album = await Album.findByPk(req.params.id)
    await album.destroy()
    res.json({deleted: true})
 })

module.exports = router;