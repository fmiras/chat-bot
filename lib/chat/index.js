var exports = module.exports = {};

var service = require('./service');
var bot = require('./bot');

const messages = [];
const users = {};

exports.load = function (io) {
    io.on('connection', function (socket) {

        socket.on('new user', function (username) {
            service.addUser(users, socket.id, username);
        });

        function callback(data) {
            socket.emit('chat message', data)
        };

        service.emitHistory(messages, callback);

        socket.on('chat message', function (msg) {
            const data = {
                socketId: socket.id,
                username: users[socket.id],
                msg: msg
            };

            messages.push(data);

            function callback(data) {
                io.emit('chat message', data)
            };

            service.emitMessage(data, callback);

        });

        socket.on('bot chat message', function (msg) {

            function callback(msg) {
                socket.emit('chat message', msg);
            };

            service.emitMessage(msg, callback);
            response = bot.comunicate(msg);

            function callback2(response) {
                socket.emit('bot chat message', response);
            };

            service.emitMessage(response, callback2);

        });
    });
};