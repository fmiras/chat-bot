var routes = require('../routes/index');

var exports = module.exports = {};

exports.load = function (app) {
    app.use('/', routes);
};