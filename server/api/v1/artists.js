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

// Get all artists for app usages
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

//get all artist only
router.get('/all', async (req,res) => {
    const allArtists = await Artist.findAll({});
        res.json(allArtists);   
})

// Get top 10 artists
router.get('/top/:userId', async (req,res) => {

    const topArtists = await Artist.findAll({
    include: [
        {
            model: Song,
            include: [{model: Interaction, where: {isLiked: true, userId: req.params.userId}}],
        },
        {
            model: Album
        }
    ],
    limit: 10,
    subQuery: false,
    group: "id"
});

topArtists.sort((artistA, artistB) => { return artistB["Songs"].length - artistA["Songs"].length})

res.json(topArtists.filter(artist => (artist["Songs"].length > 0)));      
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

            const body = [newArtist].flatMap((doc) => {
                return [{ index: {_index: "artists", _type: "artist"} }, doc]});
        
            const { body: bulkResponse } = await client.bulk({refresh: true, body});
            if(bulkResponse.errors) {
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