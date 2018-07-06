const MovieModel = require('../models/movies');

const omdbService = require('../services/omdbapi');

const { omdbLink } = process.env;

const { omdbToken } = process.env;

const findMovieApi = (req, res) => {
  if (!req.params) return Promise.reject(new Error('Body not found'));
  const title = req.params.s;
  console.log('title', title);
  const url = `${omdbLink}apikey=${omdbToken}&s=${title}`;
  console.log(url);  
  omdbService.searchMovieByUrl(url)
  .then((movie) => {
  
      if (!movie) return Promise.reject(new Error('Movie Already Exists'));
      res.send(movie);
      
    }).catch((err) => {
      res.status(err.code || 500);
      res.send(err.message);
    });
};


const saveMovieApi = (req, res) => {
  if (!req.body) Promise.reject(new Error('Body not found Exists'));

  const { imdbID } = req.body;
  const url = `${omdbLink}apikey=${omdbToken}&i=${imdbID}`;

  return MovieModel.findOne({ imdbID })
    .then((movie) => {
        console.log(movie);
      if (movie) return Promise.reject(new Error('Movie Already Exists'));
      return omdbService.searchMovieByUrl(url);
    })
    .then((oldbody) => {
      if (!oldbody) Promise.reject(new Error('Movie not found'));
      const body = JSON.parse(oldbody);
      const movie = new MovieModel({
        title: body.Title,
        year: body.Year,
        rated: body.Rated,
        released: body.Released,
        runtime: body.Runtime,
        genre: body.Genre,
        director: body.Director,
        writer: body.Writer,
        actors: body.Actors,
        plot: body.Plot,
        poster: body.Poster,
        imdbID: body.imdbID
      });
      
      return movie;
    })
    .then((movie) => {
      if (!movie) Promise.reject(new Error('Error with the model'));

      return movie.save((error, movieStored) => {
        if (error) Promise.reject(new Error('Error when saving'));
        return movieStored;
      });
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch((err) => {
      res.status(err.code || 500);
      res.send(err.message);
    });
};

module.exports = {
  findMovieApi,
  saveMovieApi,
};
