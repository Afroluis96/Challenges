const scheduleModel = require('../models/schedules');

const movieModel = require('../models/movies');

const roomModel = require('../models/rooms');

const moment = require('moment');

const momentTz = require('moment-timezone');
moment().utcOffset();
const timeZone = 'America/El_Salvador';
moment().format();

const addSchedule = (req, res) => {
  
  if (!req.body) {
    res.status(404).send({ message: 'No body found' });
  }
  const {
    scheduleDate, startTime, movieId, roomId,
  } = req.body;

  let { price } = req.body;
  
  const startTimeFormated = moment(startTime, 'hh:mm A').format('HH:mm ');   
  
  if(!moment(scheduleDate, 'DD-MM-YYYY').isValid()) res.status(404).send({message:'Schedule date not valid, insert a real date'});
  const realDate = moment.utc(scheduleDate, 'DD-MM-YYYY').format();
  movieModel.findOne({ _id:movieId })
    .then((movie) => {
      if (!movie) return Promise.reject(new Error('Movie does not exists'));
      movieFound = movie;
      
      return Promise.all([roomModel.findOne({ _id:roomId }), movie, scheduleModel.find({scheduleDate:realDate}).sort({"endTime":-1}).limit(1)]);
    })
    .then(([room, movie, schedule]) => {
      let flagCreateSchedule = 0;
      let minutesDiference = 30;
      if (!room) return Promise.reject(new Error('Room does not exists'));
      if(!price) price = room.price;

      let durationMovie = movie.runtime;
      durationMovie = Number(durationMovie.substr(0,durationMovie.indexOf(' ')));
      const durationCompleteTime = moment(startTime,'hh:mm A').add(durationMovie, 'minutes').format('HH:mm');
      const startTimeDate = moment.utc((scheduleDate +' '+ startTimeFormated), 'DD-MM-YYYY HH:mm').format();
      console.log('startTimeFotmated: ',(scheduleDate +' ' + startTimeFormated));

      const endTimeDate = moment.utc((scheduleDate +' '+ durationCompleteTime), 'DD-MM-YYYY HH:mm').format();

      const scheduleNow = moment.utc(startTimeDate);

      if(schedule.length === 0){
        flagCreateSchedule = 1;
      }
      else{
        const scheduleStored = moment.utc(schedule[0].endTime);
        minutesDiference = scheduleNow.diff(scheduleStored, 'minutes');
        console.log(minutesDiference);
      }
      if (minutesDiference < 30) return Promise.reject(new Error('Schedule can not start until 30 minutes after the previus schedule'));
      else  flagCreateSchedule = 1; 
      
      if (flagCreateSchedule === 1) {
        return schedule = new scheduleModel({
              scheduleDate : realDate,
              startTime : startTimeDate,
              endTime : endTimeDate,
              movieId,
              roomId,
              price,
              availableSeats : room.capacity,
             }).save()
      }
      else{
        return Promise.reject(new Error('Could not create th schedule'));
      }
      
     // const momentDateTz = momentTz.tz((scheduleDate + startTimeFormated),'DD-MM-YYYY HH:mm',timeZone).format();
     

    })
    .then(saved =>{
      res.send(saved);
    })
    .catch((error) => {
      res.status(500).send({ message: `Error adding the schedule: ${error} ` });
    });
};

module.exports = {
  addSchedule,
};
