require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const actiones = require('./controller/app.js');
const {PORT} = process.env;

const app = express();
app.use(bodyParser.json());

actiones(app);

app.listen(PORT, () =>
    console.log(`Review runnning on port ${PORT}`)
)