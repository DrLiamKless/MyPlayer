const express = require("express");
const router = express.Router();
const db = require('../../connection')
const { Artist, Album, Song, Interaction, albums_by_artists} = require('../../models');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config()

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
    try{
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
    } catch (err) {
        res.send("error occured");
    }
})

// Get top 10 albums
router.get('/top/:userId', async (req,res) => {
    try{
        const topAlbums = await Album.findAll({
            include: [
                {
                    model: Song,
                    include: [{model: Interaction, where: {isLiked: true, userId: req.params.userId}}],
                },
                {
                    model: Artist
                }
            ],
            limit: 10,
            subQuery: false,
            group: "song_id"
        });
        
        topAlbums.sort((albumA, albumB) => { return albumB["Songs"].length - albumA["Songs"].length})
        
        res.json(topAlbums.filter(album => (album["Songs"].length > 0)));     
    } catch(err) {
        res.send("error occured");
    }
})

// albums by artists
router.get('/albumsByArtists', async (req, res) => {
    try{
        const all = await albums_by_artists.findAll({});
        res.json(all);   
    } catch (err) {
        res.send("error occured")
    }
})

// all albums
router.get('/all', async (req, res) => {
    try{
        const allAlbums = await Album.findAll({ })
        res.json(allAlbums);   
    } catch (err) {
        res.send("error occured")
    }
})

// Get a specific album by id
router.get('/:id', async (req,res) => {
    try{
        const album = await Album.findByPk(req.params.id, {
            include: [{model: Song, include: Interaction}, {model: Artist}]
        });
        res.json(album);   
    } catch (err) {
        res.send("error occured")
    }
})

// Insert album to albums:
router.post('/add', async (req,res) => {
    const album = req.body;
    const artistId = album.artistId
    const albumId = album.id;
    
    try { 
        artistExists = await Artist.findOne({where: {id: artistId}});

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
        res.send('error has occured')
    }
 })

 //update an album from albums
router.patch('/update/:id', async (req, res) => {
    try{
        const album = await Album.findByPk(req.params.id);
        await album.update(req.body);
        res.json(album)
    } catch (err) {
        res.send("error occured")
    }
  })

// Delete a album from albums
router.delete('/delete/:id', async (req,res) => {
    try{
        const album = await Album.findByPk(req.params.id)
        await album.destroy()
        res.json({deleted: true})
    } catch (err) {
        res.send("error occured")
    }
 })

module.exports = router;