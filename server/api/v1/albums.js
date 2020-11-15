const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Artist, Album, Song, Interaction, albums_by_artists} = require('../../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
    cloud: {
        id: process.env.ELASTIC_ID
    },
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD,
    }
})

// Get all albums + search query
router.get('/', async (req,res) => {
    const albumName = req.query.albumName;
    const firstWordCondition = albumName ? {albumName: { [Op.like]: `${albumName}%`} } : null;
    const otherWordsCondition = albumName ? {albumName: { [Op.like]: `% ${albumName}%`} } : null;
    const condition = firstWordCondition ||  firstWordCondition ? 
    { [Op.or]: [firstWordCondition,otherWordsCondition] } : null


    const allAlbums = await Album.findAll({ 
        include: [Artist],
        where: condition
    })
        res.json(allAlbums);   
})

router.get('/all', async (req, res) => {
    const allAlbums = await Album.findAll({ })
        res.json(allAlbums);   
})

router.get('/albumsByArtists', async (req, res) => {
    const all = await albums_by_artists.findAll({});
    res.json(all);   
})

// Get top 20 albums - for now its 2
router.get('/top', (req,res) => {
    const sql = `
    SELECT albums.id AS id, albums.artist_id AS artistId, album_name AS albumName,
    album_cover_img AS albumCoverImg,  artist_cover_img AS artistCoverImg, playsSum 
    from 
    (albums INNER JOIN artists ON albums.artist_id = artists.id)
	LEFT JOIN
    (SELECT album_id, SUM(play_count) AS playsSum FROM myplayer.songs AS s 
    LEFT JOIN 
    myplayer.interactions AS i ON s.song_id = i.song_id 
    GROUP BY album_id) 
    AS sumTable ON albums.id = sumTable.album_id ORDER BY playsSum DESC LIMIT 20`
    db.query(sql, async (err, results) => {
        if (err) throw err;

        const idysCondition = []
        for (let i = 0; i < results.length; i++) {
            idysCondition.push({id: results[i].id });
        }

        const condition = { [Op.or]: idysCondition }

        const topAlbums = await Album.findAll({
        include: [Song, Artist],
        where: condition
    });
        res.json(topAlbums);  
    })
})

// Get a specific album by id
router.get('/:id', async (req,res) => {
    const album = await Album.findByPk(req.params.id, {
        include: [{model: Song, include: Interaction}, {model: Artist}]
    });
        res.json(album);   
})

// Insert album to albums:
router.post('/add', async (req,res) => {
    const album = req.body;
    const artistId = album.artistId
    const albumId = album.id;
    
    try { 
        artistExists = await Artist.findOne({where: {id : artistId}});

        if(artistExists) {
            const newAlbum = await Album.create(album);
            const albumByArtist = await albums_by_artists.create({artistId, albumId: newAlbum.id});

            const albumAdded = await Album.findOne({
                where: {id: newAlbum.id},
                include: [
                    {
                        model: Artist,
                        attributes: ['artistName']
                    },
                ],
                attributes: ["albumName", "id", "albumCoverImg"]
            });
    
            const body = [albumAdded].flatMap((doc) => {
                return [{ index: {_index: "albums", _type: "album"} }, doc]});
        
            const { body: bulkResponse } = await client.bulk({refresh: true, body});
            if(bulkResponse.errors) {
                return res.json(bulkResponse.errors)
            };
            res.json('added album!')
        } else { 
            return res.json('you have tried to add album to an unexisting artist')
        }
       
    } catch (err) {
        console.log(err)
        res.send('error has occured')
    }
 })

 //update an album from albums
router.patch('/update/:id', async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.update(req.body);
    res.json(album)
  })

// Delete a album from albums
router.delete('/delete/:id', async (req,res) => {
    const album = await Album.findByPk(req.params.id)
    await album.destroy()
    res.json({deleted: true})
 })

module.exports = router;