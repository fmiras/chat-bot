var exports = module.exports = {};

exports.emitMessage = function (msg, callback) {
    callback(msg);
};

exports.emitHistory = function (messages, callback) {
    messages.forEach(function (msg) {
        exports.emitMessage(msg, callback)
    })
};

exports.addUser = function (users, socketId, username) {
    users[socketId] = username;
};
