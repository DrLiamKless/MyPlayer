const express = require("express");
const router = express.Router();
const db = require('../connection')

// Get all songs
router.get('/', (req,res) => {
    const sql = 
    `Select songs.song_id, youtube_link, album_id, songs.artist_id, song_name,
    length, track_number, lyrics, songs.created_at, songs.upload_at, artist_name,
    artist_cover_img, interactions_id, user_id, is_liked, play_count
    from songs INNER JOIN artists ON songs.artist_id = artists.artist_id 
    LEFT JOIN interactions ON interactions.song_id = songs.song_id

    `
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
router.get('/search/:song_name', (req,res) => {
    const sql = `
    SELECT * FROM songs 
    INNER JOIN artists ON songs.artist_id = artists.artist_id 
    WHERE song_name LIKE"${req.params.song_name}%" ORDER BY song_name ASC `
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific song by id for the searching  zone
router.get('/song/:id', (req,res) => {
    const sql = `
    SELECT * FROM songs 
    INNER JOIN artists ON songs.artist_id = artists.artist_id 
    LEFT JOIN interactions ON interactions.song_id = songs.song_id 
    WHERE songs.song_id = '${req.params.id}'`
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

// new interaction - like/unlike:
router.post('/likeButton', (req,res) => {
    const newInteraction = req.body;
    if(newInteraction.is_liked == null) {
        newInteraction.is_liked = 1;
        const sql = 'INSERT INTO interactions SET ?';
        db.query(sql, newInteraction, (err, result) => {
            if (err) throw (err);
            res.json(result)
        })    
    } else {
        const sql = `UPDATE interactions SET is_liked = ${newInteraction.is_liked}
        WHERE song_id = '${newInteraction.song_id}'`;
        db.query(sql, (err, result) => {
            if (err) throw (err);
            res.json(result)
        })    
    }
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