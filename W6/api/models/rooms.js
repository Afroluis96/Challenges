const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: String,
  capacity: Number,
  price: Number
});

module.exports = mongoose.model('rooms', roomSchema);
