
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var RedisStore = require('connect-redis')(express); // Add Redis for session store

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress()); // Added manually for gzip compression
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('KvotheTheBloodless')); // Set the salt
app.use(express.session({
  store: new RedisStore(process.env.REDISTOGO_URL)
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// app.use(express.session({
//   store: new RedisStore({
//     host: 'barreleye.redistogo.com',
//     port: '10842',
//     user: 'redistogo',
//     pass: '222eab3202e3fdb3dbaa602a5f69cd29'
//   })
// }));
