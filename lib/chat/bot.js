const { capitalizeWords } = require('../util/string')
const botResponse = require('../../config/bot-response')
const currencyUtil = require('../util/currency')

let name

const comunicate = (msg, callback) => {
  if (msg.search(/convert/i) !== -1 && msg.search(/pesos to dollars/i) !== -1) {
    const pesos = msg.slice(msg.search(/convert/i)).split(' ')[1]
    if (isNaN(pesos)) {
      let response = botResponse.currencyConversion.error.replace('{:pesos}', pesos)
      callback(response)
    } else {
      const currencyCallback = dollars => {
        let response = botResponse.currencyConversion.success
            .replace('{:pesos}', pesos)
            .replace('{:dollars}', dollars)
        callback(response)
      }

      currencyUtil.convertPesosToDollars(pesos, currencyCallback)
    }
  } else {
    let response = botResponse.wildcard
    if (msg.search(/my name is/i) !== -1) {
      name = msg.slice(msg.search(/my name is/i)).slice(11)
      name = capitalizeWords(name)
      response = botResponse.greeting.replace('{:name}', name)
    }

    if (msg.search(/what is my name?/i) !== -1) {
      if (!name) {
        response = botResponse.naming.error
      } else {
        response = botResponse.naming.success.replace('{:name}', name)
      }
    }

    callback(response)
  }
}

module.exports = { comunicate }
