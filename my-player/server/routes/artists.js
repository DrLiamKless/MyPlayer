const express = require("express");
let router = express.Router();
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
    const sql = 'Select * from artists LIMIT 10'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific artist by id
router.get('/:id', (req,res) => {
    const sql = `SELECT * FROM artists WHERE atist_id = ${req.params.id}`
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