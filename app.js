var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const server = require('./routes/index')

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', server.users)
app.use('/', server.ToDo)
app.use('/', server.optimize)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Set locals, hanya memberikan error di development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log error hanya di production
  if (req.app.get('env') === 'production') {
      console.error(err.stack);
  }

  // Render halaman error
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
