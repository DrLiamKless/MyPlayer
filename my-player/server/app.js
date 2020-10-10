const express = require('express');
const authenticateToken = require('./middlewares/auth')

const app = express();
app.use(express.json())

app.use("/users", require("./api/v1/users"));
app.use("/api/v1", authenticateToken, require('./api/v1'));



module.exports = app;