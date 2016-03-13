var exports = module.exports = {};

require('../util/string')();
var botResponse = require('../../config/bot-response');
var currencyUtil = require('../util/currency');

var name;

exports.comunicate = function (msg, callback) {
  if (msg.search(/convert/i) != -1 && msg.search(/pesos to dollars/i) != -1) {
    const pesos = msg.slice(msg.search(/convert/i)).split(' ')[1];
    if (isNaN(pesos)) {
      response = botResponse.currencyConversion.error.replace('{:pesos}', pesos);
      callback(response);
    } else {
      function currencyCallback(dollars) {
        response = botResponse.currencyConversion.success
            .replace('{:pesos}', pesos)
            .replace('{:dollars}', dollars);
        callback(response);
      }

      currencyUtil.convertPesosToDollars(pesos, currencyCallback);
    }
  }else {

    var response = botResponse.wildcard;
    if (msg.search(/my name is/i) != -1) {
      name = msg.slice(msg.search(/my name is/i)).slice(11).capitalizeWords();
      response = botResponse.greeting.replace('{:name}', name);
    }

    if (msg.search(/what is my name?/i) != -1) {
      if (name == undefined) {
        response = botResponse.naming.error;
      } else {
        response = botResponse.naming.success.replace('{:name}', name);
      }
    }

    callback(response);
  }
}

;
