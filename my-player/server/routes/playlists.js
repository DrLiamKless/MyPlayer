const express = require("express");
const router = express.Router();
const db = require('../connection')

// Get all playlists
router.get('/', (req,res) => {
    const sql = 'Select * from playlists'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    });
});

// Get top 20 playlists
router.get('/top', (req,res) => {
    const sql = `
    SELECT * FROM playlists JOIN (SELECT playlist_id, SUM(play_count) AS sum 
    FROM songs_in_playlists INNER JOIN interactions 
    WHERE songs_in_playlists.song_id = interactions.song_id
    GROUP BY playlist_id) AS SumTable 
    ON playlists.playlist_id = SumTable.playlist_id
    ORDER BY sum DESC`
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    });
});

// Get a specific playlist by id
router.get('/:id', (req,res) => {
    const sql = `SELECT * FROM playlists WHERE playlist_id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

// Get all songs from a playlist
router.get('/songsList/:id', (req,res) => {
    const sql = 
    `SELECT p.playlist_id, playlist_name, playlist_cover_img, p.created_at,
    p.upload_at, list_of_songs, s.song_id, youtube_link, album_id, artist_id,
    song_name, length, track_number, lyrics, user_id, is_liked, play_count, sip.songs_in_playlists_id
    FROM playlists AS p 
    JOIN songs_in_playlists AS sip ON p.playlist_id = sip.playlist_id
    JOIN songs AS s ON s.song_id = sip.song_id
    LEFT JOIN interactions ON s.song_id = interactions.song_id
    WHERE p.playlist_id = '${req.params.id}'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    });
});

// Insert playlist to playlists:
router.post('/add', (req,res) => {
    const date = new Date(Date.now());
    const dateToShow = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const newPlaylist = req.body;
    newPlaylist.created_at = dateToShow;
    newPlaylist.upload_at = dateToShow;
    console.log(newPlaylist)
    const sql = 'INSERT INTO playlists SET ?';
    db.query(sql, newPlaylist, (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
});

// Insert song into playlist:
router.post('/addSong', (req,res) => {
    const newSong = req.body;
    const sql = `INSERT INTO songs_in_playlists SET ?`
    db.query(sql, newSong, (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
});

// update a playlist from playlists
router.put('/update/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE playlists SET name = ?, cover_img = ? WHERE id = ?';
    db.query(sql, [update.name, update.cover_img, req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
});

// remove song from playlist:
router.get('/removeSong/:id', (req,res) => {
    const sql = `DELETE FROM songs_in_playlists WHERE (songs_in_playlists_id = '${req.params.id}');
    `;
    db.query(sql, (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
});

// Delete a playlist from playlists
router.delete('/delete/:id', (req,res) => {
    const sql = 'DELETE FROM playlists WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
});

module.exports = router;