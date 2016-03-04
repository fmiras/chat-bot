var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./lib/routes');
var chats = require('./lib/chat');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

routes.load(app);

chats.load(io);

http.listen(3000, function(){
  console.log('listening on *:3000');
});