const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/db');
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// view engine setup

// basic setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', (req, res) => {
  res.send('Hello from Main Route.');
});

module.exports = app;
