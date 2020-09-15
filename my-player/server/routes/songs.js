const express = require("express");
let router = express.Router();
const db = require('../connection')

// Get all songs
router.get('/', (req,res) => {
    const sql = 'Select * from songs INNER JOIN artists ON songs.artist_id = artists.artist_id'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get newest songs
router.get('/newest', (req,res) => {
    const sql = 'Select * from songs INNER JOIN artists ON songs.artist_id = artists.artist_id ORDER BY created_at DESC LIMIT 8'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 songs
router.get('/top', (req,res) => {
    const sql = 'SELECT * FROM songs INNER JOIN artists ON songs.artist_id = artists.artist_id INNER JOIN interactions ON songs.song_id = interactions.song_id WHERE is_liked = 1 AND user_id = 1 LIMIT 20;'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific song by title for the searching  zone
router.get('/search/:title', (req,res) => {
    const sql = `SELECT * FROM songs INNER JOIN artists ON songs.artist_id = artists.artist_id WHERE title LIKE "${req.params.title}%" ORDER BY title ASC `
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Insert song to songs:
router.post('/add', (req,res) => {
    const newSong = req.body;
    const sql = 'INSERT INTO songs SET ?';
    db.query(sql, newSong, (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

// update a song from songs
router.put('/update', (req,res) => {
    const update = req.body
    const sql = 'UPDATE songs SET title = ?, artist_id = ? WHERE title = ?';
    db.query(sql, [update.title, update.artist_id, req.params.title], (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

// Delete a song from songs
router.delete('/delete/:id', (req,res) => {
    const sql = 'DELETE FROM songs WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    })
})

module.exports = router;