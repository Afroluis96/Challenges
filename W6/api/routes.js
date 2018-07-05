const userController = require('./controllers/users');

module.exports = (app) => {
    app.post('/signUp',userController.signUp);
    app.post('/login',userController.login);
    app.post('/logout',userController.logout);
}