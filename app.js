var express = require('express');
var app = express();
var path = require('path');
var cfenv = require("cfenv");
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
	console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/CRUD')

var Book = require('./models/book');
var Write = require('./models/write');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080;

require('./routes/index')(app, Write);
require('./routes/book')(app, Book);

var server = app.listen(port, function(){
	console.log("Express server has stared on port " + port)
});
