const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = Schema({
  roomName: String,
  capacity: Number,
  price: Number
});

module.exports = mongoose.model('rooms', roomSchema);
