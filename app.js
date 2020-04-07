var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const next = require('next');
const dev = process.env.NODE_DEV !== 'production'; //true false

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

nextApp.prepare();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('*', (req, res) => {
  return handle(req, res); // for all the react stuff
});

module.exports = app;
