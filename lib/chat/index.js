var exports = module.exports = {};

var service = require('./service');

var messages = []

exports.load = function (io) {
    io.on('connection', function (socket) {
        //service.emitHistory(messages, socket, socket.emit);

        // Begin patch code
        messages.forEach(function (data) {
            socket.emit('chat message', data)
        })
        // End patch code

        socket.on('chat message', function (msg) {
            var data = {
                socketId: socket.id,
                msg: msg
            }

            messages.push(data);
            // service.emitMessage(data, io, io.emit);

            // Begin patch code
            io.emit('chat message', data)
            // End patch code

        });
    });
};