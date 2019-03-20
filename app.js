var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var connectionRouter = require('./routes/connection');
var viewRouter = require('./routes/view');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client/node_modules/')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
})

app.use('/', indexRouter);
app.use('/connection', connectionRouter.router);
app.use('/view', viewRouter);


// Prevent fatal MySQL errors from crashing the server
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});


module.exports = app;
