var exports = module.exports = {};

exports.emitMessage = function (msg,callback) {
	callback('chat message', msg);
}