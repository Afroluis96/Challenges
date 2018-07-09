const userController = require('./controllers/users');

const roomController = require('./controllers/rooms');

const movieController = require('./controllers/movies');

const scheduleController = require('./controllers/schedules');

const auth = require('./middlewares/auth');

module.exports = (app) => {
    app.post('/users',auth.authentication,auth.verifyUser,userController.addUser);
    app.post('/login',userController.login);
    app.post('/logout',userController.logout);

    app.post('/rooms',auth.authentication,roomController.addRoom);
    app.get('/rooms',auth.authentication,roomController.findRoom);

    app.get('/omdbapi/movies/:s',movieController.findMovieApi);
    app.post('/omdbapi/movies',movieController.saveMovieApi);

    app.post('/schedules',auth.authentication,scheduleController.addSchedule);
}