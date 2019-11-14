
var express = require('express');
var http = require('http');
var path = require('path');
var errorhandler = require('errorhandler');
var config = require(path.join(__dirname,'config'));
var log = require(path.join(__dirname,'libs/log'))(module);

var app = express();
app.set('port', config.get('port'))

http.createServer(app).listen(app.get('port'), function() {
    log.info('Express server listening on port ' + config.get('port'));
});

//Middleware
app.use(function(req, res, next) {
    if (req.url == '/') {
        res.end("Hello");
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    if (req.url == '/qwerty') {
        next(new Error('bla'));
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    if (req.url == '/test') {
        res.end("Test");
    } else {
        next();
    }
});

app.use(function(req, res) {
    res.status(404).send("Page Not Found, Sorry");
});


// error handler
app.use(function(err, req, res, next) {
    // NODE_ENV == 'production'
    if (app.get('env') === 'development') {
        errorhandler(err, req, res, next);
    } else {
        res.status(500);
    }
});