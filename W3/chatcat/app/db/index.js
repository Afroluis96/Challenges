'use strict';
const config = require('../config');
const Mongoose = require('mongoose').connect(config.dbURI);

//log an error if the connecion fails

Mongoose.connection.on ('error', error =>{
    console.log("MondoDB Error: ", error);
});

module.exports ={
    Mongoose
}