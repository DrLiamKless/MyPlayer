const express = require("express");
const router = express.Router();
const db = require('../connection')

// Get all albums
router.get('/', (req,res) => {
    const sql = 'Select * from albums'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 albums - for now its 2
router.get('/top', (req,res) => {
    const sql = 
    `SELECT * from (albums INNER JOIN artists ON albums.artist_id = artists.artist_id)
    INNER JOIN
    (SELECT album_id, SUM(play_count) AS playsSum FROM myplayer.songs AS s 
    INNER JOIN 
    myplayer.interactions AS i ON s.song_id = i.song_id
    GROUP BY album_id) AS sumTable ON albums.album_id = sumTable.album_id ORDER BY playsSum DESC`
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific album by id
router.get('/album/:id', (req,res) => {
    const sql = `SELECT * FROM albums INNER JOIN artists ON albums.artist_id = artists.artist_id WHERE albums.album_id = '${req.params.id}'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific album by name for the searching  zone
router.get('/search/:album_name', (req,res) => {
    const sql = `
    SELECT * FROM albums 
    INNER JOIN artists ON albums.artist_id = artists.artist_id 
    WHERE album_name LIKE "${req.params.album_name}%" ORDER BY album_name ASC`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get all songs from an album
router.get('/songsList/:id', (req , res) => {
    const sql = `
    SELECT songs.song_id, youtube_link, album_id, artist_id,
    song_name, length, track_number, lyrics, songs.created_at,
    upload_at, interactions_id, user_id, is_liked, play_count
    FROM songs LEFT JOIN interactions ON interactions.song_id = songs.song_id
    WHERE songs.album_id = '${req.params.id}'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Insert album to albums:
router.post('/add', (req,res) => {
    const newAlbum = req.body;
    const sql = 'INSERT INTO albums SET ?';
    db.query(sql, newAlbum, (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

// update an album from albums
router.put('/update/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE albums SET name = ? WHERE id = ?';
    db.query(sql, [update.name, req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result) 
    })
})

// Delete a album from albums
router.delete('/delete/:id', (req,res) => {
    const sql = 'DELETE FROM albums WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})
module.exports = router;