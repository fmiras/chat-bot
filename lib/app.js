var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var routes = require('./routes');
var chats = require('./chat');

app.use(express.static(path.join(__dirname, '../public')));

routes.load(app);
chats.load(io);

http.listen(3000, function () {
  console.log('listening on *:3000');
});