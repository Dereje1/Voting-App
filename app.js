var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


var httpProxy = require('http-proxy');

var app = express();
app.use(logger('dev'));
// Set up PROXY server with the module from above
const apiProxy = httpProxy.createProxyServer(
  {target:"http://localhost:3001"}
)
//apply middleware that intercepts all requests to the /api and retrieves the resources from the prxy
app.use('/api',function(req,res){
  apiProxy.web(req,res)
})
//end proxy setup

app.use(express.static(path.join(__dirname, 'public')));


// DEFINES THE MAIN ENTRY POINT
app.get('*', function(req, res){
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //console.log(req.body)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
