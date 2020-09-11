const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Liam1234',
    database:'myplayer'
});

db.connect((err) => {
    if(err) {
    console.log(error);
    }
    console.log("MySQL connected..")
})


// Get all songs
app.get('/songs', (req,res) => {
    const sql = 'Select * from songs INNER JOIN artists ON songs.artist_id = artists.artist_id'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get all artists
app.get('/artists', (req,res) => {
    const sql = 'Select * from artists'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get all playlists
app.get('/playlists', (req,res) => {
    const sql = 'Select * from playlists'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get newest songs
app.get('/newest_songs', (req,res) => {
    const sql = 'Select * from songs ORDER BY created_at DESC LIMIT 5'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 songs
app.get('/top_songs', (req,res) => {
    const sql = 'SELECT * FROM songs INNER JOIN interactions ON songs.song_id = interactions.song_id WHERE is_liked = 1 LIMIT 20;'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 artists - for now its 10
app.get('/top_artists', (req,res) => {
    const sql = 'Select * from artists LIMIT 10'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 albums - for now its 2
app.get('/top_albums', (req,res) => {
    const sql = 'Select * from albums LIMIT 2'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get top 20 playlists
app.get('/top_playlists', (req,res) => {
    const sql = 'Select * from playlists'
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})

// Get a specific song by id
app.get('/song/:id', (req,res) => {
    const sql = `SELECT * FROM songs WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific artist by id
app.get('/artist/:id', (req,res) => {
    const sql = `SELECT * FROM artists WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific album by id
app.get('/album/:id', (req,res) => {
    const sql = `SELECT * FROM albums WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Get a specific playlist by id
app.get('/playlist/:id', (req,res) => {
    const sql = `SELECT * FROM playlists WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

// Insert song to songs:
app.post('/song', (req,res) => {
    const newSong = req.body;
    const sql = 'INSERT INTO songs SET ?';
    db.query(sql, newSong, (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Insert album to albums:
app.post('/album', (req,res) => {
    const newAlbum = req.body;
    const sql = 'INSERT INTO albums SET ?';
    db.query(sql, newAlbum, (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Insert playlist to playlists:
app.post('/playlist', (req,res) => {
    const newPlaylist = req.body;
    const sql = 'INSERT INTO playlists SET ?';
    db.query(sql, newPlaylist, (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Insert artist to artists:
app.post('/playlist', (req,res) => {
    const newArtist = req.body;
    const sql = 'INSERT INTO playlists SET ?';
    db.query(sql, newArtist, (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// update a song from songs
app.put('/song/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE songs SET title = ?, artist_id = ? WHERE id = ?';
    db.query(sql, [update.title, update.artist_id, req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// update an artist from artists
app.put('/artist/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE artist SET name = ?, cover_img = ? WHERE id = ?';
    db.query(sql, [update.name, update.cover_img, req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// update an album from albums
app.put('/album/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE albums SET name = ? WHERE id = ?';
    db.query(sql, [update.name, req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// update a playlist from playlists
app.put('/playlist/:id', (req,res) => {
    const update = req.body
    const sql = 'UPDATE playlists SET name = ?, cover_img = ? WHERE id = ?';
    db.query(sql, [update.name, update.cover_img, req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Delete a song from songs
app.delete('/song/:id', (req,res) => {
    const sql = 'DELETE FROM songs WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Delete a artist from artists
app.delete('/artist/:id', (req,res) => {
    const sql = 'DELETE FROM artists WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Delete a album from albums
app.delete('/album/:id', (req,res) => {
    const sql = 'DELETE FROM albums WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})

// Delete a playlist from playlists
app.delete('/playlist/:id', (req,res) => {
    const sql = 'DELETE FROM playlists WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw (err);
        console.log(result);
        res.json(result)
    })
})


app.listen(8080, () => {
    console.log('MyPlayer server is listening on port 8080...')
})