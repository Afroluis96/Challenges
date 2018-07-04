require('dotenv').config();

const { PORT } = process.env || 3000;

const routes = require('./routes.js');

const app = require('./app');
routes(app);
app.listen(PORT, () => {
  console.log('Running in port ', PORT);
});
