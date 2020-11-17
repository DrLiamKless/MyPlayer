const express = require('express');

const app = express();
app.use(express.json())

app.use("/api/v1", require('./api/v1'));

const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

module.exports = app;