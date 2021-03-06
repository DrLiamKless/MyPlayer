const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { User, Playlist, songs_in_playlists, Interaction, Song, user_playlists } = require('../../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config()

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


// Get all playlists + search query
router.get('/', async (req,res) => {
    const playlistName = req.query.playlistName;
    const firstWordCondition = playlistName ? {playlistName: { [Op.like]: `${playlistName}%`} } : null;
    const otherWordsCondition = playlistName ? {playlistName: { [Op.like]: `% ${playlistName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null


    const allPlaylists = await Playlist.findAll({
        include: [{model: Song, include: Interaction}, {model: User}],
        where: condition
    });
        res.json(allPlaylists);   
})

// Get top 10 playlists for user
router.get('/top/:userId', async (req,res) => {

    const topPlaylists = await Playlist.findAll({
    include: [
        {
            model: Song,
            include: [{model: Interaction, where: {isLiked: true, userId: req.params.userId}}],
        },
        {
            model: User,
        }
  
    ],
    limit: 10,
    subQuery: false,
});

topPlaylists.sort((playlistA, playlistB) => { return playlistB["Songs"].length - playlistA["Songs"].length})

res.json(topPlaylists.filter(playlist => (playlist["Songs"].length > 0)));      
})

router.get('/all', async (req,res) => {
    try{
        const allPlaylists = await Playlist.findAll({where: {publich: true}});
        res.json(allPlaylists);   
    } catch (err) {
        res.send("error occures")
    }
})

router.get('/songsInPlaylists', async (req,res) => {
    try{
        const all = await songs_in_playlists.findAll({});
        res.json(all);   
    } catch (err) {
        res.send("error occures")
    }
})

router.get('/userPlaylists', async (req,res) => {
    try {
        const all = await user_playlists.findAll({});
        res.json(all);   
    } catch (err) {
        res.send("error occures")
    }
})


// get playlist by id
router.get('/:id', async (req,res) => {
    try{
        const playlist = await Playlist.findByPk(req.params.id, {
            include: [{model: Song, include: Interaction}, {model: User}],
        });
        res.json(playlist);   
    } catch (err) {
        res.send("error occures")
    }
})

// get songs_in_playlists by id
router.get('/songInPlaylist/:songId/:playlistId', async (req,res) => {
    try{
        const songInPlaylist = await songs_in_playlists.findOne({
            where: [{song_id: req.params.songId}, {playlist_id: req.params.playlistId}],
            attributes: ['id', 'songId', 'playlistId']
        });
        res.json(songInPlaylist);   
    } catch (err) {
        res.send("error occures")
    }
})

// // Insert playlist to playlists:
router.post('/add', async (req,res) => {
    const playlist = req.body;
    playlistId = playlist.id;
    try {
        const newPlaylist = await Playlist.create (playlist)
        
        const body = [newPlaylist].flatMap((doc) => {
            return [{ index: {_index: "playlists", _type: "playlist"} }, doc]});
            
            const { body: bulkResponse } = await client.bulk({refresh: true, body});
            if(bulkResponse.errors) {
                return res.json(bulkResponse.errors)
            };
            res.json("playlist added");
    } catch (err) {
        res.json('error occured while posting playlist');
    }
})

// Insert song into playlist:
router.post('/addSong', async (req,res) => {
    try{
        const newSong = await songs_in_playlists.create(req.body)
        res.json(newSong)
    } catch (err) {
        res.send("error occures")
    }
 })

// update a playlist from playlists
router.patch('/update/:id', async (req, res) => {
    try{
        const playlist = await Playlist.findByPk(req.params.id);
        await playlist.update(req.body);
        res.json(playlist)
    } catch (err) {
        res.send("error occures")
    }
  })

// remove song from playlist:
router.delete('/removeSong/:id', async (req,res) => {
    try{
        const song = await songs_in_playlists.findOne({where: {id: req.params.id}})
        await song.destroy()
        res.json({deleted: true})
    } catch (err) {
        res.send("error occures")
    }
 })

// Delete a playlist from playlists
router.delete('/delete/:id', async (req,res) => {
    try{
        const playlist = await Playlist.findByPk(req.params.id)
        await playlist.destroy()
        res.json({deleted: true})
    } catch (err) {
        res.send("error occures")
    }
 })


module.exports = router;