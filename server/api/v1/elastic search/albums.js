const { Router } = require('express');
const router = Router();

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

router.get('/:albumName', async (req, res) => {
    const albumName = req.params.albumName

    try {
        const { body } = await client.search({
            index: 'albums',
            body: {
                query: {
                    wildcard: { albumName: `*${albumName}*`}
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