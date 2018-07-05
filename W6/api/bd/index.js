require('dotenv').config('../.env');

const mongoose = require('mongoose');

const {DB_LINK} = process.env;

mongoose.connect(DB_LINK, (err, res) => {
  if (err) {
      return console.log(`Error when trying to connect ${err}`);
  }
  console.log('Connection Stablished...');
});
