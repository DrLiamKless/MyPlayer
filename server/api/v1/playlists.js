const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { User, Playlist, songs_in_playlists, Interaction, Song, user_playlists } = require('../../models');
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
    const allPlaylists = await Playlist.findAll({});
        res.json(allPlaylists);   
})

router.get('/songsInPlaylists', async (req,res) => {
    const all = await songs_in_playlists.findAll({});
        res.json(all);   
})

router.get('/userPlaylists', async (req,res) => {
    const all = await user_playlists.findAll({});
        res.json(all);   
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

// Get top 20 playlists of user
router.get('/top/:userName', (req,res) => {
    const sql = `
    SELECT playlists.id, playlist_name AS playlistName,
    playlist_cover_img AS playlistCoverImg, created_at AS createdAt, playsSum
    FROM playlists JOIN (SELECT playlist_id, SUM(play_count) AS playsSum 
    FROM songs_in_playlists INNER JOIN interactions 
    ON songs_in_playlists.song_id = interactions.song_id
    GROUP BY songs_in_playlists.playlist_id) AS SumTable 
    ON playlists.id = SumTable.playlist_id ORDER BY playsSum DESC LIMIT 5`
    db.query(sql, async (err, results) => {
        if (err) throw err;

        const idysCondition = []
        for (let i = 0; i < results.length; i++) {
            idysCondition.push({id: results[i].id });
        }

        const condition = { [Op.or]: idysCondition }

        const topPlaylists = await User.findAll({
        include: [{model: Playlist, include: [{model: Song, include: Interaction}, {model: User}], where: condition}],
        where: {userName: req.params.userName}
    });
        res.json(topPlaylists);   
    });
})

// get playlist by id
router.get('/:id', async (req,res) => {
    const playlist = await Playlist.findByPk(req.params.id, {
        include: [{model: Song, include: Interaction}, {model: User}],
    });
        res.json(playlist);   
})

// get songs_in_playlists by id
router.get('/songInPlaylist/:songId/:playlistId', async (req,res) => {
    const songInPlaylist = await songs_in_playlists.findOne({
        where: [{song_id: req.params.songId}, {playlist_id: req.params.playlistId}],
        attributes: ['id', 'songId', 'playlistId']
    });
        res.json(songInPlaylist);   
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
    const newSong = await songs_in_playlists.create(req.body)
    res.json(newSong)
 })

// update a playlist from playlists
router.patch('/update/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    await playlist.update(req.body);
    res.json(playlist)
  })

// remove song from playlist:
router.delete('/removeSong/:id', async (req,res) => {
    const song = await songs_in_playlists.findOne({where: {id: req.params.id}})
    await song.destroy()
    res.json({deleted: true})
 })

// Delete a playlist from playlists
router.delete('/delete/:id', async (req,res) => {
    const playlist = await Playlist.findByPk(req.params.id)
    await playlist.destroy()
    res.json({deleted: true})
 })


module.exports = router;