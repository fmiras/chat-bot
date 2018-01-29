const routes = require('../../routes/index')

const load = app => app.use('/', routes)

module.exports = { load }
