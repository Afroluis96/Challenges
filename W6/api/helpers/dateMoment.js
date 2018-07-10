const moment = require('moment');

const momentTz = require('moment-timezone');
moment().utcOffset();
const timeZone = 'America/El_Salvador';
moment().format();

const setHour = (time) =>{
  return moment(time, 'hh:mm A').format('HH:mm ');   
}

const setDate = (date) => {
  return moment.utc(date, 'DD-MM-YYYY').format();
}

const validateHour = (time) =>{
  return moment(time, 'hh:mm a').isValid();
}

const validateDate = (date) =>{
  return moment(date, 'DD-MM-YYYY').isValid();
}

const parsingDate = (date) =>{
  return moment.utc(date);
}

const TimeDifference = (endDate, startDate, timeParameter) =>{
  startDate = parsingDate(startDate);  
  return startDate.diff(endDate, timeParameter);
}

const addTime = (time, timeToAdd, timeParameter) =>{
  return moment(time,'hh:mm A').add(timeToAdd, timeParameter).format('HH:mm');
}

const addDays = (date, timeToAdd, dayParameter) =>{
  return moment(date,'DD-MM-YYYY HH:mm').add(timeToAdd, dayParameter).format('DD-MM-YYYY');
}

const addDaysTime = (date, timeToAdd, dayParameter) =>{
    return moment(date,'YYYY-MM-DD HH:mm').add(timeToAdd, dayParameter).format();
  }

const setTimeToDate = (date, time) =>{
  return moment.utc((date +' '+ time), 'DD-MM-YYYY HH:mm').format()
}

const getToday = () =>{
  return moment().format('DD-MM-YYYY');
}

module.exports = {
  setHour,
  validateDate,
  validateHour,
  setDate,
  parsingDate,
  TimeDifference,
  addTime,
  setTimeToDate,
  getToday,
  addDays,
  addDaysTime
}
