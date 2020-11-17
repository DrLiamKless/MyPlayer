const { Router } = require('express');
const router = Router();
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

router.get('/:playlistName', async (req, res) => {
    const playlistName = req.params.playlistName

    try {
        const { body } = await client.search({
            index: 'playlists',
            body: {
                query: {
                    wildcard: { playlistName: `*${playlistName}*`}
                }
            }
        })
         
        const results = body.hits.hits.map(playlist => playlist._source);

        res.json(results)
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;