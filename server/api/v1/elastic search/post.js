const { Router } = require('express');
const router = Router();
const db = require('../../../connection')
const { Song, Artist, Playlist, Album } = require('../../../models');
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

router.get('/songs', async (req, res) => {
    const songs = await Song.findAll({
        include: [
            {
                model: Artist,
                attributes: ['artistName', 'artistCoverImg', 'id']
            },
            {
                model: Album,
                attributes: ['albumName']
            },
        ],
        attributes: ["songName", "id", "youtubeLink"]
    });

    const body = songs.flatMap((doc) => {
        return [{ index: {_index: "songs", _type: "song"} }, doc]});

    const { body: bulkResponse } = await client.bulk({refresh: true, body});
    if(bulkResponse.errors) {
        return res.json(bulkResponse.errors)
    };
    const { body: count } = await client.count({index: "songs"});
    res.send(count);    
});

router.get('/albums', async (req, res) => {
    const albums = await Album.findAll({
        include: [
            {
                model: Artist,
                attributes: ['artistName']
            },
        ],
        attributes: ["albumName", "id", "albumCoverImg"]
    });

    const body = albums.flatMap((doc) => {
        return [{ index: {_index: "albums", _type: "album"} }, doc]});

    const { body: bulkResponse } = await client.bulk({refresh: true, body});
    if(bulkResponse.errors) {
        return res.json(bulkResponse.errors)
    };
    const { body: count } = await client.count({index: "albums"});
    res.send(count);    
});

router.get('/artists', async (req, res) => {
    const artists = await Artist.findAll({
        attributes: ["artistName", "id", "artistCoverImg"]
    });

    const body = artists.flatMap((doc) => {
        return [{ index: {_index: "artists", _type: "artist"} }, doc]});

    const { body: bulkResponse } = await client.bulk({refresh: true, body});
    if(bulkResponse.errors) {
        return res.json(bulkResponse.errors)
    };
    const { body: count } = await client.count({index: "artists"});
    res.send(count);    
});

router.get('/playlists', async (req, res) => {
    const playlists = await Playlist.findAll({
        attributes: ["playlistName", "id", "playlistCoverImg"]
    });

    const body = playlists.flatMap((doc) => {
        return [{ index: {_index: "playlists", _type: "playlist"} }, doc]});

    const { body: bulkResponse } = await client.bulk({refresh: true, body});
    if(bulkResponse.errors) {
        return res.json(bulkResponse.errors)
    };
    const { body: count } = await client.count({index: "playlists"});
    res.send(count);    
});

router.get('/deleteSongs', (req, res) => {
    try {
        client.indices.delete({
            index: 'songs',
        }).then(response => {
            res.send('deleted')
        })
    } catch (err) {
        res.json('not deleted');
    }
})

router.get('/deleteArtists', (req, res) => {
    try {
        client.indices.delete({
            index: 'artists',
        }).then(response => {
            res.send('deleted')
        })
    } catch (err) {
        res.json('not deleted');
    }
})

router.get('/deleteAlbums', (req, res) => {
    try {
        client.indices.delete({
            index: 'albums',
        }).then(response => {
            res.send('deleted')
        })
    } catch (err) {
        res.json('not deleted');
    }
})

module.exports = router;