const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Liam1234',
    database : 'myplayer'
});

db.connect((err) => {
    if(err) {
    console.log(error);
    }
    console.log("MySQL connected..")
})


// Get all songs
app.get('/songs', (req,res) => {
    let sql = 'Select * from songs'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 songs - for now its 2
app.get('/top_songs', (req,res) => {
    let sql = 'Select * from songs LIMIT 2'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 artists - for now its 10
app.get('/top_artists', (req,res) => {
    let sql = 'Select * from artists LIMIT 10'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 albums - for now its 2
app.get('/top_albums', (req,res) => {
    let sql = 'Select * from albums LIMIT 2'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 playlists - for now its 1
app.get('/top_playlists', (req,res) => {
    let sql = 'Select * from playlists LIMIT 1'
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific song by id
app.get('/song/:id', (req,res) => {
    let sql = `SELECT * FROM songs WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific artist by id
app.get('/artist/:id', (req,res) => {
    let sql = `SELECT * FROM artists WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific album by id
app.get('/album/:id', (req,res) => {
    let sql = `SELECT * FROM albums WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific playlist by id
app.get('/playlist/:id', (req,res) => {
    let sql = `SELECT * FROM playlists WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Insert song to songs: PILOT NOT WORKING
// app.post('/song', (req,res) => {
//     let song = req.body
//     let sql = `INSERT INTO songs SET VALUES (${
//         song.id,
//         song.Youtube_link,
//         song.Album_id,
//         song.Artist_id,
//         song.Title,
//         song.Length,
//         song.track_number,
//         song.Lyrics,
//         song.Created_at,
//         song.Upload_at    
//     })`
//     let query = db.query(sql, song, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send(`song ${song.Title} added`)
//     })
// })

app.listen(8080, () => {
    console.log('MyPlayer server is listening on port 8080...')
})