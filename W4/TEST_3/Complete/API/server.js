require('dotenv').config();

const express = require('express');
const {PORT} = process.env;
const bodyParser = require('body-parser');
const actiones = require('./controller/app.js');

const app = express();
app.use(bodyParser.json());

actiones(app);    

app.listen(PORT,()=>{
    console.log("Running on port: ",PORT)
})