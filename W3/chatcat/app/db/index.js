'use strict';
const config = require('../config');
const Mongoose = require('mongoose');
Mongoose.connect(config.dbURI);

//log an error if the connecion fails
var db = Mongoose.connection;
db.on('error', error =>{
    console.log("MondoDB Error: ", error);
});

//create a schema that defines the structure for storung user data
const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

//Turn the shema into a usable model
let userModel = Mongoose.model('chatUser', chatUser);

module.exports ={
    Mongoose,
    userModel
}