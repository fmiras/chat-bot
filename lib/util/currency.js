var exports = module.exports = {};

var request = require('sync-request');

exports.convertPesosToDollars = function (pesos) {
    var dollars = null;
    var currencyData = exports.getCurrencyDataJson();
    if (currencyData != null) {
        dollarPrice = currencyData.quotes.USDARS;
        dollars = parseFloat((pesos / dollarPrice).toFixed(2));
    }
    return dollars;
};

exports.getCurrencyDataJson = function () {
    var response = request('GET', 'http://apilayer.net/api/live?access_key=5e0515ed9c04d5c8150ee533021bb989&currencies=ARS&source=USD&format=1');
    if (response.statusCode == 200) {
        return JSON.parse(response.getBody());
    } else
        return null;
};