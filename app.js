
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var pg = require('pg');

var app = express();
var pgclient;

pg.connect(process.env.HEROKU_POSTGRESQL_ORANGE_URL, function(err, client, done) {
	pgclient = client;
 });

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	pgclient.query('SELECT * FROM products', function(err, result) {
    	if(err) return console.error(err);
    	console.log(result.rows);
		res.render('index', { title: 'Express', products: result.rows });
  });
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
