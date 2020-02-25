const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 
app.use(express.static(__dirname + '/public'));
app.use('/index.html', express.static('.'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) { 
        res.status( err.code || 500 )
        .json({
          status: 'dev_error',
          message: err.code + " " + err + req + res + next
        });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'prod_error',
    message: err.message
  });
});

module.exports = app;
