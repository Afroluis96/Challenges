const userController = require('./controllers/users');
const roomController = require('./controllers/rooms');
const movieController = require('./controllers/movies');

module.exports = (app) => {
    app.post('/signUp',userController.signUp);
    app.post('/login',userController.login);
    app.post('/logout',userController.logout);

    app.post('/rooms',roomController.addRoom);
    app.get('/rooms',roomController.findRoom);

    app.get('/omdbapi/movies/:s',movieController.findMovieApi);
    app.post('/omdbapi/movies',movieController.saveMovieApi);
}