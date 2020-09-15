const express = require("express");
let router = express.Router();
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
    const sql = 'Select * from albums LIMIT 2'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific album by id
router.get('/:id', (req,res) => {
    const sql = `SELECT * FROM albums WHERE album_id = ${req.params.id}`
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