const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const router = require('./routes/router');
const errorsHandler = require('./middlewares/errorsHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
