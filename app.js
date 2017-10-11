var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');


var httpProxy = require('http-proxy');

//authentication requirements
var mongoose = require('mongoose');
var passport = require('passport');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore = require('connect-mongo')(session);


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

// configuration  for authentication===============================================================
mongoose.connect("mongodb://localhost:27017/votingapp"); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms


// required for passport
app.use(session(
  { secret: 'ilovescotchscotchyscotchscotch',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
  }
)); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//end authentication

app.use(express.static(path.join(__dirname, 'public')));


// DEFINES THE MAIN ENTRY POINT
app.get('*', function(req, res){
  console.log("Hello??")
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
