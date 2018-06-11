const express   = require('express');
const path      = require('path');
const favicon   = require('serve-favicon');
const logger    = require('morgan');
const mongoose  = require('mongoose');
const passport  = require('passport');

const user      = require('./routes/api/user');
const profile   = require('./routes/api/profile');
const posts     = require('./routes/api/post');

const app       = express();

// DB Config
const db        = require('./config/db');
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

// Handling CORS(Cross-Origin-Resource-Sharing) Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// use routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', posts);

// errors handling
app.use((req, res, next) => {
  const error = new Error('404 Error. Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;