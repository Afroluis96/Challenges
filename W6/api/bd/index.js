require('dotenv').config('../.env');

const mongoose = require('mongoose');

const {dbLink} = process.env;

mongoose.connect(dbLink, (err, res) => {
  if (err) {
      return console.log(`Error when trying to connect ${err}`);
  }
  console.log('Connection Stablished...');
});
 module.exports = {
     mongoose
 }