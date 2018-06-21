
const express = require ('express');
const weatherCtrl = require('./controller/weather');
require('dotenv').config();

let app = express();


weatherCtrl(app);

