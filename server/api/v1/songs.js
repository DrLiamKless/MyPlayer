const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Song, Artist, Interaction, Album, songs_by_artists, albums_by_artists } = require('../../models');
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

router.get('/all', async (req,res) => {
    const allSongs = await Song.findAll({});
        res.json(allSongs);   
})

router.get('/songsByArtists', async (req, res) => {
    const all = await songs_by_artists.findAll({});
    res.json(all);   
})


// Get all songs + search query
router.get('/', async (req,res) => {
    const songName = req.query.songName;
    const firstWordCondition = songName ? {songName: { [Op.like]: `${songName}%`} } : null;
    const otherWordsCondition = songName ? {songName: { [Op.like]: `% ${songName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null

    const allSongs = await Song.findAll({
        include: [{model: Artist}],
        where: condition
    });
        res.json(allSongs);   
})

// Get top 20 songs
router.get('/top/:userId', async (req,res) => {
        try{
            const topSongs = await Song.findAll({
                include: [
                    {
                        model: Interaction,
                        where: {
                            isLiked: true,
                            userId: req.params.userId
                        }
                    },
                    {
                        model: Artist,
                    }
                ],
                limit: 20,
            });
            res.json(topSongs);   
        } catch (err) {
            res.send("error occures")
        }
    })
    
// Get a specific song by id
router.get('/:id', async (req,res) => {
        try{
        const song = await Song.findByPk(req.params.id, {
            include: [Interaction, Artist]
        });
        res.json(song);   
    } catch (err) {
        res.send("error occures")
    }
})

// Insert song to songs:    
router.post('/add', async (req,res) => {
    try {
        const song = req.body;
        const albumId = song.albumId;
        const artistId = song.artistId;

        const artist = await Artist.findOne({where: {id: artistId}})
        const album = await Album.findOne({where: {id: albumId}})
            
        if (artist && album) {
            const newSong = await Song.create(song);
            const newSongByArtist = await songs_by_artists.create({artistId, songId: newSong.id});
            const newAlbumByArtist = await albums_by_artists.create({artistId, albumId});
            
            const songAdded = await Song.findOne({
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

        const body = [songAdded].flatMap((doc) => {
            return [{ index: {_index: "songs", _type: "song"} }, doc]});
    
        const { body: bulkResponse } = await client.bulk({refresh: true, body});
        if(bulkResponse.errors) {
            res.json(bulkResponse.errors)
        };
        res.json('added song!') 
        } else {
            res.json('artist or album dosent exists');
        }
    } catch (err) {
        res.send('error has occured')
    }
 })

// update a song from songs
router.patch('/update/:id', async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        await song.update(req.body);
        res.json(song)
    } catch (err) {
        res.send("error occures")
    }
  })

// new interaction - like/unlike:
router.post('/:songId/user-liked/:userId', async (req,res) => {
    try{
        const interaction = req.body;
        if(interaction.songId) {
            const newInteraction = await Interaction.create(interaction)
            res.json(newInteraction)
            console.log('1')
        } else {
            console.log('2')
            const updatedInteraction = await Interaction.update(interaction,{where: 
                {
                    songId: req.params.songId,
                    userId: req.params.userId
                }
            })
            res.json(updatedInteraction)
        }
    } catch (err) {
        res.send("error occures")
    }
})

// Delete a artist from artists
router.delete('/delete/:id', async (req,res) => {
    try{
        const song = await Song.findByPk(req.params.id)
        await song.destroy()
        res.json({deleted: true})
    } catch (err) {
        res.send("error occures")
    }
 })


module.exports = router;