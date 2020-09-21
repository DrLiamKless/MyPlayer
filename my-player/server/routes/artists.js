const express = require("express");
const router = express.Router();
const db = require('../connection')

// Get all artists
router.get('/', (req,res) => {
    const sql = 'Select * from artists'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 artists - for now its 10
router.get('/top', (req,res) => {
    const sql = 
    `SELECT artists.artist_id,
    artists.artist_name,
    artists.artist_cover_img,
    artists.upload_at, SUM(play_count) AS countSum 
FROM songs
JOIN interactions
ON songs.song_id = interactions.song_id
JOIN artists ON songs.artist_id = artists.artist_id
GROUP BY artists.artist_id ORDER BY countSum DESC`
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific artist by id
router.get('/artist/:id', (req,res) => {
    const sql = `SELECT * FROM artists WHERE artist_id = '${req.params.id}'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// get a all songs by artist (limit 5)
router.get('/songsList/:id', (req,res) => {
    const sql =
    `SELECT a.artist_id, artist_name, artist_cover_img,
    s.song_id, youtube_link, album_id, song_name, length,
    track_number, lyrics, user_id, is_liked, play_count
    FROM artists AS a 
    LEFT JOIN songs_by_artists AS sba ON a.artist_id = sba.artist_id
    LEFT JOIN songs AS s ON s.song_id = sba.song_id
    LEFT JOIN interactions ON sba.song_id = interactions.song_id
    WHERE a.artist_id = ${req.params.id} LIMIT 5`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// get a all albums by artist (limit 5)
router.get('/albumsList/:id', (req,res) => {
    const sql =
    `SELECT * FROM artists AS ar 
    JOIN albums_by_artists AS aba ON ar.artist_id = aba.artist_id
    JOIN albums AS al ON al.artist_id = aba.artist_id
    WHERE ar.artist_id = '${req.params.id}' GROUP BY al.album_id LIMIT 5`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Insert artist to artists:
router.post('/add', (req,res) => {
    const newArtist = req.body;
    const sql = 'INSERT INTO artists SET ?';
    db.query(sql, newArtist, (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

// update an artist from artists
router.put('/update/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE artist SET name = ?, cover_img = ? WHERE id = ?';
    db.query(sql, [update.name, update.cover_img, req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

// Delete a artist from artists
router.delete('/delete/:id', (req,res) => {
    const sql = 'DELETE FROM artists WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

module.exports = router;