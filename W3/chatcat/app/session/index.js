'use strict';
const session = require ('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if(process.env.NODE_ENV === 'production'){
    //initialize session with settings for production
    modul.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUnitialized: false,
        store: new MongoStore({
            mongooseConnection: db.Mongoose.connection
        })
    });
}else{
    //Initializde session with settings for dev
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUnitialized: true,
    });
}