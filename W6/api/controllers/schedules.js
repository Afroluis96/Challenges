const scheduleModel = require('../models/schedules');

const movieModel = require('../models/movies');

const roomModel = require('../models/rooms');

const moment = require('moment');

const addSchedule = (req, res) => {
  console.log('Entro wey');
  if (!req.body) {
    res.status(404).send({ message: 'No body found' });
  }
  const {
    scheduleDate, startTime, movieId, roomId,
  } = req.body;
  const startTimeFormated = moment(startTime, 'h:hh A');
  console.log('start formated: ', startTimeFormated);
  let durationMovie;
  if(!moment(scheduleDate, 'DD-MM-YYYY').isValid()) res.status(404).send({message:'Schedule date not valid, insert a real date'});

  let movieFound = '';
  let roomFound = '';
  
  movieModel.findById({ movieId })
    .then((movie) => {
      if (!movie) return Promise.reject(new Error('Movie does not exists'));
      movieFound = movie;
      let con = 134;
      durationMovie = Math.floor(con.asHours()) + moment.utc(con.asMilliseconds()).format(":mm:ss");
      console.log('duration: ', durationMovie);
      return Promise.all(roomModel.findById({ roomId }), movie);
    })
    .then((room, movie) => {
      if (!room) return Promise.reject(new Error('Room does not exists'));
      console.log('room: '+room+' movie: '+ movie);
      
    })
    .catch((error) => {
      res.status(500).send({ message: `Error adding the schedule: ${error} ` });
    });


  /* let schedule = new roomModel({
    roomName,
    capacity,
    price
  });
  room.save((err, roomStore) =>{

      if(err) res.status(500).send({message:`Error when savong the room ${err}`});

      res.status(200).send({room: roomStore});
  }) */
};

module.exports = {
  addSchedule,
};
