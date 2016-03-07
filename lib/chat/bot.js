var exports = module.exports = {};

require('../util/string')();
exports.currencyUtil = require('../util/currency');

var name;

exports.comunicate = function (msg) {
    var response = "Sorry i don't know how to answer to that... not yet.";
    if (msg.search(/my name is/i) != -1) {
        name = msg.slice(msg.search(/my name is/i)).slice(11).capitalizeWords();
        response = "Hello " + name + ", nice to meet you.";
    }
    if (msg.search(/what is my name?/i) != -1) {
        if (name == undefined) {
            response = "I don't know your name."
        } else {
            response = "Your name is " + name + ".";
        }
    }
    if (msg.search(/convert/i) != -1 && msg.search(/pesos to dollars/i) != -1) {
        const pesos = msg.slice(msg.search(/convert/i)).split(" ")[1];
        if (isNaN(pesos)) {
            response = pesos + " is not a number. I can't convert it to dollars."
        } else {
            const dollars = exports.currencyUtil.convertPesosToDollars(pesos);
            response = pesos + " pesos are " + dollars + " dollars.";
        }
    }

    return response;
}
;