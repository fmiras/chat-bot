const request = require('request-promise')

const convertPesosToDollars = (pesos, callback) => {
  getCurrencyData()
      .then(data => {
        const dollarPrice = data.quotes.USDARS
        const dollars = parseFloat((pesos / dollarPrice).toFixed(2))
        callback(dollars)
      }, error => {
        callback(null, error)
      })
}

const getCurrencyData = () => {
  const url = 'http://apilayer.net/api/live?currencies=ARS&source=USD&format=1'
  const options = {
    uri: url,
    qs: {
      access_key: '5e0515ed9c04d5c8150ee533021bb989'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  return request(options)
}

module.exports = { convertPesosToDollars }
