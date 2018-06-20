'use-strict';

const express = require('express');
const app =  express();

//En esta carpeta se encuentran las rutas y configuracion de sesion y base de datos, en el index, se encuentran definidas las
//variables a las que se accede, con el module.export, las cuales contienen las direcciones a las carpetas que hacen referencia
//a las diferentes configuraciones
const chatCat = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine','ejs');

app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatCat.router);

chatCat.ioServer(app).listen(app.get('port'),()=>{
    console.log('CharCAT Running on port:',app.get('port'));
});