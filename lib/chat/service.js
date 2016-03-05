var exports = module.exports = {};

exports.emitMessage = function (msg, io, callback){
    callback('chat message', msg);
};