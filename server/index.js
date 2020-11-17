const app = require('./app')
require('dotenv').config()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`MyPlayer server is listening on port ${port}...`)
});