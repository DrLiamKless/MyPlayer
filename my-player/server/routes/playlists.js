const express = require("express");
const router = express.Router();
const db = require('../connection')
const { Artist, Album, Playlist, songs_in_playlists, Interaction, Song } = require('../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;


// Get all playlists + search query
router.get('/', async (req,res) => {
    const playlistName = req.query.playlistName;
    const firstWordCondition = playlistName ? {playlistName: { [Op.like]: `${playlistName}%`} } : null;
    const otherWordsCondition = playlistName ? {playlistName: { [Op.like]: `% ${playlistName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null


    const allPlaylists = await Playlist.findAll({
        include: [{model: Song, include: Interaction}],
        where: condition
    });
    console.log(condition)
        res.json(allPlaylists);   
})

// Get top 20 playlists
router.get('/top', (req,res) => {
    const sql = `
    SELECT playlists.id, playlist_name AS playlistName,
    playlist_cover_img AS playlistCoverImg, created_at AS createdAt, playsSum
    FROM playlists JOIN (SELECT playlist_id, SUM(play_count) AS playsSum 
    FROM songs_in_playlists INNER JOIN interactions 
    ON songs_in_playlists.song_id = interactions.song_id
    GROUP BY songs_in_playlists.playlist_id) AS SumTable 
    ON playlists.id = SumTable.playlist_id LIMIT 20`
    db.query(sql, async (err, results) => {
        if (err) throw err;

        const idysCondition = []
        for (let i = 0; i < results.length; i++) {
            idysCondition.push({id: results[i].id });
        }

        const condition = { [Op.or]: idysCondition }

        const topPlaylists = await Playlist.findAll({
        include: [{model: Song, include: Interaction}],
        where: condition
    });
        res.json(topPlaylists);   
    });
})

// get playlist by id
router.get('/:id', async (req,res) => {
    const playlist = await Playlist.findByPk(req.params.id, {
        include: [{model: Song, include: Interaction}],
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
    const newPlaylist = await Playlist.create (req.body)
         res.json(newPlaylist)
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