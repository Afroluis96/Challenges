const SequelizeAuto = require("sequelize-auto");
require('dotenv').config({})

const {DB_NAME,DB_HOST,DB_USER,DB_PASSWORD,DB_PORT} = process.env;



var auto = new SequelizeAuto(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    port: DB_PORT,
    additional:{
        timestamps:false
    }
});

auto.run(function(err){
    if(err) throw err;

    console.log(auto.tables);
})
