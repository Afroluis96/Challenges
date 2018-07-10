const scheduleModel = require('../models/schedules');

const movieModel = require('../models/movies');

const roomModel = require('../models/rooms');

const dateHelper = require('../helpers/dateMoment');

const addSchedule = (req, res) => {
  
  if (!req.body) {
    res.status(404).send({ message: 'No body found' });
  }
  const {
    scheduleDate, startTime, movieId, roomId,
  } = req.body;

  let { price } = req.body;
  
  const validatedDate = dateHelper.setDate(scheduleDate);
  
  if(!dateHelper.validateHour(startTime)) res.status(404).send({message:'Schedule start time not valid, insert a real time'});
  if(!dateHelper.validateDate(scheduleDate)) res.status(404).send({message:'Schedule date not valid, insert a real date'});

  movieModel.findOne({ _id:movieId })
    .then((movie) => {
      if (!movie) return Promise.reject(new Error('Movie does not exists'));
      
      return Promise.all([roomModel.findOne({ _id:roomId }), movie, scheduleModel.find({scheduleDate:validatedDate, roomId}).sort({"endTime":-1}).limit(1)]);
    })
    .then(([room, movie, schedule]) => {
      let flagCreateSchedule = 0;
      let minutesDiference = 30;
      
      const startTimeFormated = dateHelper.setHour(startTime);

      let durationMovie = movie.runtime;
      durationMovie = Number(durationMovie.substr(0,durationMovie.indexOf(' ')));

      const endMovieTime = dateHelper.addTime(startTime, durationMovie, 'minutes');

      const startTimeDate = dateHelper.setTimeToDate( scheduleDate, startTimeFormated );

      const endTimeDate = dateHelper.setTimeToDate( scheduleDate, endMovieTime );

      if (!room) return Promise.reject(new Error('Room does not exists'));

      if(schedule.length === 0){
        flagCreateSchedule = 1;
      }
      else{
        const scheduleFound = dateHelper.parsingDate(schedule[0].endTime);
        minutesDiference = dateHelper.TimeDifference(scheduleFound,startTimeDate, 'minutes');
        console.log(minutesDiference);
      }

      if(!price) price = room.price;

      if (minutesDiference < 30) return Promise.reject(new Error('Schedule can not start until 30 minutes after the previus schedule'));
      else  flagCreateSchedule = 1; 
      
      if (flagCreateSchedule === 1) {
        return schedule = new scheduleModel({
              scheduleDate : validatedDate,
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

const moviesSpecificDay = (req, res, date) =>{
    console.log(date);
 scheduleModel.find({'scheduleDate':date})
    .populate('movieId')
    .then(billboard => {
        res.send(billboard);
    }).catch((error) => {
    res.status(500).send({ message: `Error finding the billboard: ${error} ` });
    });

}

const moviesBetween = (req, res, startDate, endDate) => {
    console.log(startDate);
    console.log(endDate);
 scheduleModel.find({'scheduleDate':{$gte:startDate, $lt:endDate}})
    .populate('movieId')
    .then(billboard => {
        res.send(billboard);
    }).catch((error) => {
    res.status(500).send({ message: `Error finding the billboard: ${error} ` });
    });
}

const findBillboard = (req, res) =>{
  let {startDate, endDate} = req.query;
  if(!startDate) startDate = dateHelper.getToday();
  if(!endDate) endDate = dateHelper.addDays(startDate,7,'days');
  startDate = dateHelper.setDate(startDate);
  
  endDate = dateHelper.setDate(endDate);
  if(startDate === endDate) {
      
      endDate = dateHelper.addDaysTime(startDate, 1439, 'minutes');
    }
   moviesBetween(req, res, startDate,endDate);
}

module.exports = {
  addSchedule,
  findBillboard
};
