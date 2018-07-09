const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const ticketSchema = new Schema({
  scheduleId: { type: Schema.Types.ObjectId, ref: 'schedules' },
  quantity: { type: Number, default: 1 },
  total: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
  versionKey: false,
});

module.exports = mongoose.model('tickets', ticketSchema);
