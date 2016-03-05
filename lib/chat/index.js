var exports = module.exports = {};

var service = require('./service');

exports.load = function (io) {
    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            // service.emitMessage(msg, io, io.emit);
            io.emit('chat message', msg)
        });
    });
};