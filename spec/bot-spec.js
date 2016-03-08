'use strict';
var bot = require('../lib/chat/bot');
var sinon = require('sinon');
require('jasmine-sinon');

describe('comunicate', function () {
  it('should emit a wildcard message for any request', function () {
    const msg = "Hello! What's up?";
    const response = bot.comunicate(msg);
    expect(response).toBe("Sorry i don't know how to answer to that... not yet.");
  });

  it('should say i dont know your name', function () {
    const msg = 'What is my name?';
    const response = bot.comunicate(msg);
    expect(response).toBe("I don't know your name.");
  });

  it('should save a name and say hello', function () {
    const msg = 'Hello! My name is John smith';
    const response = bot.comunicate(msg);
    expect(response).toBe('Hello John Smith, nice to meet you.');
  });

  it('should say who you are', function () {
    const msg = 'What is my name?';
    const response = bot.comunicate(msg);
    expect(response).toBe('Your name is John Smith.');
  });

  it('should convert the amount of pesos that the user indicates to pesos', function () {
    var json = {
      success: true,
      terms: 'https:\/\/currencylayer.com\/terms',
      privacy: 'https:\/\/currencylayer.com\/privacy',
      timestamp: 1457293875,
      source: 'USD',
      quotes: {
        USDARS: 15.03,
      },
    };
    spyOn(bot.currencyUtil, 'getCurrencyDataJson').and.returnValue(json);
    const msg = 'Man, convert 76 pesos to dollars';
    const response = bot.comunicate(msg);
    expect(response).toBe('76 pesos are 5.06 dollars.');
  });

  it('should not convert and say that the word is not a number', function () {
    const msg = 'Convert as2g pesos to dollars';
    const response = bot.comunicate(msg);
    expect(response).toBe("as2g is not a number. I can't convert it to dollars.");
  });
});
