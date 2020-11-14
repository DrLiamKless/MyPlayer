const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Artist, Album, Song, Interaction } = require('../../models');

const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    cloud: {
        id: process.env.ELASTIC_ID
    },
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
    }
})

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
    try {
        const artist = req.body;
        const artistId = artist.id;
        const artistName = artist.artistName;
        const artistCoverImg = artist.artistCoverImg;
    
        const artistExists = await Artist.findOne({
            where: {artistName},
        });
    
        if(!artistExists) {
            const newArtist = await Artist.create(artist)

            const artistAdded = await Artist.findOne(
                {
                    where: {artistName: artistName},
                    attributes: ["artistName", "id", "artistCoverImg"]
                })

            const body = [artistAdded].flatMap((doc) => {
                return [{ index: {_index: "artists", _type: "artist"} }, doc]});
        
            const { body: bulkResponse } = await client.bulk({refresh: true, body});
            if(bulkResponse.errors) {
                console.log(bulkResponse)
                return res.json(bulkResponse.errors)
            };
            res.json("artist added");
        } else {
            res.json('artist with that name already exists')
        }
    } catch (err) {
        console.error(err);
        res.send('error occured whilt posting an artist');
    }
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