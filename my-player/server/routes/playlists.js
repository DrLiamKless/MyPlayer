const express = require("express");
let router = express.Router();
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
    const sql = 'Select * from playlists'
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

// Insert playlist to playlists:
router.post('/add', (req,res) => {
    const newPlaylist = req.body;
    const sql = 'INSERT INTO playlists SET ?';
    db.query(sql, newPlaylist, (err, result) => {
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

// Delete a playlist from playlists
router.delete('/delete/:id', (req,res) => {
    const sql = 'DELETE FROM playlists WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        res.json(result)
    });
});

module.exports = router;