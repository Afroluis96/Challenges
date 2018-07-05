const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = Schema({
  title: String,
  year: Date,
  rated: String,
  title: String,
  released: String,
  runtime: String,
  genre: String,
  director: String,
  writer: String,
  actors: String,
  plot: String,
  poster: String,
  userRoleId: [{ type: Schema.Types.ObjectId, ref: 'userRoles' }],
});

module.exports = mongoose.model('movies', movieSchema);
