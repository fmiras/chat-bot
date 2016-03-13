var botResponse = require('../config/bot-response');
var proxyquire = require('proxyquire').noPreserveCache();
var sinon = require('sinon');
var rewire = require('rewire');
var bot = rewire('../lib/chat/bot');
require('jasmine-sinon');

describe('comunicate', function () {
  it('should emit a wildcard message for any request', function () {
    const msg = "Hello! What's up?";
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy).toHaveBeenCalledWith(botResponse.wildcard);
  });

  it('should save a name and say hello', function () {
    const msg = 'Hello! My name is John Smith';
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy).toHaveBeenCalledWith(botResponse.greeting.replace('{:name}', 'John Smith'));
  });

  it('should capitalize and save a name and say hello', function () {
    const msg = 'Hello! My name is john smith';
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy).toHaveBeenCalledWith(botResponse.greeting.replace('{:name}', 'John Smith'));
    expect(bot.__get__('name')).toBe('John Smith');
  });

  it('should say who you are', function () {
    bot.__set__('name', 'John Smith');
    const msg = 'What is my name?';
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy).toHaveBeenCalledWith(botResponse.naming.success.replace('{:name}', 'John Smith'));
  });

  it('should say i dont know your name', function () {
    bot.__set__('name', undefined);
    const msg = 'What is my name?';
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy).toHaveBeenCalledWith(botResponse.naming.error);
  });

  it('should convert the amount of pesos that the user indicates to pesos', function () {
    var currencyUtilStub = {};
    bot = proxyquire('../lib/chat/bot', { '../util/currency': currencyUtilStub });
    currencyUtilStub.convertPesosToDollars = function (pesos, callback) {
      var dollarPrice = 15.03;
      var dollars = parseFloat((pesos / dollarPrice).toFixed(2));
      callback(dollars);
    };

    const msg = 'Man, convert 76 pesos to dollars';
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy)
        .toHaveBeenCalledWith(botResponse.currencyConversion.success
            .replace('{:pesos}', '76')
            .replace('{:dollars}', '5.06'));
  });

  it('should not convert and say that the word is not a number', function () {
    const msg = 'Convert as2g pesos to dollars';
    const spy = sinon.spy();
    bot.comunicate(msg, spy);
    expect(spy).toHaveBeenCalledWith(botResponse.currencyConversion.error.replace('{:pesos}', 'as2g'));
  });
});
