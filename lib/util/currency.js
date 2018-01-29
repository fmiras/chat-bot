var exports = module.exports = {}

var request = require('request-promise')

exports.convertPesosToDollars = function (pesos, callback) {
  var dollars = null
  var dollarPrice
  getCurrencyData()
      .then(function (data) {
        dollarPrice = data.quotes.USDARS
        dollars = parseFloat((pesos / dollarPrice).toFixed(2))
        callback(dollars)
      }, function () {
        callback(null)
      })
}

function getCurrencyData () {
  var url = 'http://apilayer.net/api/live?currencies=ARS&source=USD&format=1'
  var options = {
    uri: url,
    qs: {
      access_key: '5e0515ed9c04d5c8150ee533021bb989' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  return request(options)
};
