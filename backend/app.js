const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes/router');
const errorsHandler = require('./middlewares/errorsHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const allowedCors = ['https://mesto.diakova.nomoredomains.icu',
  'http://mesto.diakova.nomoredomains.icu',
  'https://mesto.app.diakova.nomoredomains.icu',
  'http://mesto.app.diakova.nomoredomains.icu',
  'http://localhost:3000'];

const app = express();

//app.use(cors({
  //origin: allowedCors,
  //credentials: true,
 // methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
 // allowedHeaders: ['Authorization', 'Content-type', 'Accept'],
//}));
 app.use((req, res, next) => {
 const { origin } = req.headers;
 const { method } = req;
 const requestHeaders = req.headers['access-control-request-headers'];
 const allowMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
 if (allowedCors.includes(origin)) {
 res.header('Access-Control-Allow-Origin', origin);
 res.header('Access-Control-Allow-Credentials', 'true');
 }
 if (method === 'OPTIONS') {
 res.header('Access-Control-Allow-Headers', requestHeaders);
 res.header('Access-Control-Allow-Methods', allowMethods);
 return res.end();
 }
 next();
 });

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
