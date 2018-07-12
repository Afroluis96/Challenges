const MovieModel = require('../models/movies');

const omdbService = require('../services/omdbapi');

const scheduleModel = require('../models/schedules');

const dateHelper = require('../helpers/dateMoment');

const { omdbLink } = process.env;

const { omdbToken } = process.env;

const findMovieApi = (req, res) => {
  if (!req.params) return Promise.reject(new Error('Body not found'));
  let page = (req.query.page !== undefined) ? Number(req.query.page) : 1;   
  const title = req.params.s;
  console.log('title', title);
  const url = `${omdbLink}apikey=${omdbToken}&s=${title}&page=${page}`;
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

   MovieModel.findOne({ imdbID })
    .then((movie) => {
      if (movie) return Promise.reject(new Error('Movie Already Exists'));
      return omdbService.searchMovieByUrl(url);
    })
    .then((oldbody) => {
      if (!oldbody) Promise.reject(new Error('Movie not found'));
      const body = JSON.parse(oldbody);
      const yearFormated = dateHelper.getYear(body.Year, 'YYYY');
      return movie = new MovieModel({
        title: body.Title,
        year: yearFormated,
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
      }).save();
      
    })
    .then((saved) => {
      res.send(saved);
    })
    .catch((err) => {
      res.status(err.code || 500);
      res.send(err.message);
    });
};

const findMovieSchedules = (req, res) => {
  
  const today = dateHelper.getToday();  
  const weekFromToday =  dateHelper.addDays(today, 7, 'days');

  const todayFormated = dateHelper.setDate(today);
  const weekFormated = dateHelper.setDate(weekFromToday);

  const id = req.params.id;
  let headSent = 0;
  if(!id.match(/^[0-9a-fA-F]{24}$/)){
    headSent = 1;
    res.status(400).send({message:'Id not well formated'});
  }
  MovieModel.findById(id)
  .then(movie =>{
    if(!movie) return Promise.reject(new Error('Not movie Found'));
    headSent = 0;
    return  scheduleModel.find({ scheduleDate: { $gte: todayFormated, $lt: weekFormated } })
  })
 .then((billboard) => {
   if(billboard.length === 0) res.send('The movie its not playing this week ')
   else res.send(billboard);
  }).catch((error) => {
    if(headSent === 0)
    res.status(500).send({ message: `Error finding the billboard to this movie: ${error} ` });
  });

}

module.exports = {
  findMovieApi,
  saveMovieApi,
  findMovieSchedules
};
