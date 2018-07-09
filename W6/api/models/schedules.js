const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  scheduleDate: Date,
  startTime: Date,
  endTime: Date,
  movieId: { type: Schema.Types.ObjectId, ref: 'movies' },
  roomId: { type: Schema.Types.ObjectId, ref: 'rooms' },
  price: { type: Number, default: 0 },
  availableSeats: Number,
}, {
  versionKey: false,
});

module.exports = mongoose.model('schedules', scheduleSchema);
