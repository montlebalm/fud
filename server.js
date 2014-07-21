'use strict';

var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile('public/index.html');
});

app.get('/list/:listid/item/:itemid', function(req, res) {
  res.sendfile('public/index.html');
});

var port = Number(process.env.PORT || 8080);
var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

