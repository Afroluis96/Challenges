const { mongoose } = require('../bd/index');

const { Schema } = mongoose;

const movieSchema = new Schema({
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
  imdbID: String
});

module.exports = mongoose.model('movies', movieSchema);
