require('dotenv').config();

const express = require("express");
const {PORT} = process.env;
const bodyParser = require('body-parser');
var request = require('request');


const app = express();
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log("Running on port ", PORT);
})

