'use strict';
var bot = require('../lib/chat/bot');
var botResponse = require('../config/bot-response');
var sinon = require('sinon');
require('jasmine-sinon');

describe('comunicate', function () {
  it('should emit a wildcard message for any request', function () {
    const msg = "Hello! What's up?";
    const response = bot.comunicate(msg);
    expect(response).toBe(botResponse.wildcard);
  });

  it('should say i dont know your name', function () {
    const msg = 'What is my name?';
    const response = bot.comunicate(msg);
    expect(response).toBe(botResponse.naming.error);
  });

  it('should save a name and say hello', function () {
    const msg = 'Hello! My name is John smith';
    const response = bot.comunicate(msg);
    expect(response).toBe(botResponse.greeting.replace('{:name}', 'John Smith'));
  });

  it('should say who you are', function () {
    const msg = 'What is my name?';
    const response = bot.comunicate(msg);
    expect(response).toBe(botResponse.naming.success.replace('{:name}', 'John Smith'));
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
    expect(response)
        .toBe(botResponse.currencyConversion.success
            .replace('{:pesos}', '76')
            .replace('{:dollars}', '5.06'));
  });

  it('should not convert and say that the word is not a number', function () {
    const msg = 'Convert as2g pesos to dollars';
    const response = bot.comunicate(msg);
    expect(response).toBe(botResponse.currencyConversion.error.replace('{:pesos}', 'as2g'));
  });
});
