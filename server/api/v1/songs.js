const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Song, Artist, Interaction } = require('../../models');
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
    try {
        const newSong = await Song.create(req.body)

        const song = await Song.findOne({
            where: {id: newSong.id},
            include: [
                {
                    model: Artist,
                    attributes: ['artistName', 'artistCoverImg', 'id']
                },
                {
                    model: Album,
                    attributes: ['albumName']
                },
            ],
            attributes: ["songName", "id", "youtubeLink"]
        });
    
        const body = song.flatMap((doc) => {
            return [{ index: {_index: "songs", _type: "song"} }, doc]});
    
        const { body: bulkResponse } = await client.bulk({refresh: true, body});
        if(bulkResponse.errors) {
            return res.json(bulkResponse.errors)
        };
        const { body: count } = await client.count({index: "songs"});
        res.send('added song! now you have that many songs', count);    
    } catch (err) {
        res.send('error has occured')
    }
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