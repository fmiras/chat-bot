var service = require('./service')

var exports = module.exports = {};

exports.load = function (io) {
    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            service.emitMessage(msg, io.emit);
        });
    });
}