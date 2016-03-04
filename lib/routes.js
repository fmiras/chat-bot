var routes = require('../routes/index');

function load(app) {
    app.use('/', routes);
}

module.exports.load = load;