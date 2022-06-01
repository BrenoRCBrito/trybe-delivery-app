require('express-async-errors');
const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/login');
const notFound = require('../middlewares/notFound');
const error = require('../middlewares/error');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRouter);

app.use('*', notFound);

app.use(error);

module.exports = app;
