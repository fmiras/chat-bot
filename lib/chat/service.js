var exports = module.exports = {};

exports.emitMessage = function (msg, object, callback) {
    callback('chat message', msg);
};

exports.emitHistory = function (messages, object, callback) {

    messages.forEach(function (msg) {
        exports.emitMessage(msg, object, callback)
    })

};