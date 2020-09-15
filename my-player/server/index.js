const express = require('express');
const songs = require("./routes/songs");
const albums = require("./routes/albums");
const artists = require("./routes/artists");
const playlists = require("./routes/playlists");

const app = express();
app.use(express.json())

app.use("/songs", songs);
app.use("/albums", albums);
app.use("/artists", artists);
app.use("/playlists", playlists);


app.listen(8080, () => {
    console.log('MyPlayer server is listening on port 8080...')
});