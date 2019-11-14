var http = require('http');
var path = require('path');

var express = require('express');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan'); // logger

var config = require(path.join(__dirname, 'config'));
var log = require(path.join(__dirname, 'libs/log'))(module);

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png'))); // /favicon.ico
if (app.get('env') == 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('default'));
}

app.use(bodyParser.json());  // req.body....

app.use(cookieParser()); // req.cookies

app.get('/', function(req, res, next) {
  res.render("index");
});

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
  // NODE_ENV = 'production'
  if (app.get('env') == 'development') {
    errorHandler(err, req, res, next);
  } else {
    res.send(500);
  }
});
/*

var routes = require('./routes');
var user = require('./routes/user');

// all environments

app.get('/', routes.index);
app.get('/users', user.list);

*/

http.createServer(app).listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
