const userController = require('./controllers/users');

module.exports = (app) => {
    app.post('/login',userController.login);
}