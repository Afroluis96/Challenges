const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: String,
  capacity: Number,
  price: {type: Number, default: 0}
},{
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('rooms', roomSchema);
