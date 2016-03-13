require('jasmine-sinon');
require('../lib/util/string')();
var sinon = require('sinon');
var rewire = require('rewire');
var currencyUtil = rewire('../lib/util/currency');

describe('capitalizeWords', function () {
  it('should capitalize first letters of each word of a string', function () {
    var str = 'hello world'.capitalizeWords();
    expect(str).toBe('Hello World');
  });
});

describe('convertPesosToDollars', function () {
  it('should convert an amount of pesos to dollars and the value of the dollar ' +
      'should be rounded to 2 decimals.' +
      ' Using a stub for a rest service that gives dollar value = 15.03 pesos', function (done) {
    var currencyDataJsonStub = {
      success: true,
      terms: 'https:\/\/currencylayer.com\/terms',
      privacy: 'https:\/\/currencylayer.com\/privacy',
      timestamp: 1457293875,
      source: 'USD',
      quotes: {
        USDARS: 15.03,
      },
    };
    var promise = new Promise(function (resolve, reject) {
      resolve(currencyDataJsonStub);
    });

    currencyUtil.__set__('getCurrencyData', sinon.stub().returns(promise));
    const pesos = 5;

    var spy = function (dollars) {
      expect(dollars).toBe(0.33);
      done();
    };

    currencyUtil.convertPesosToDollars(pesos, spy);
  });

  it('should return null if the api is not available', function (done) {
    var promise = new Promise(function (resolve, reject) {
      reject();
    });

    currencyUtil.__set__('getCurrencyData', sinon.stub().returns(promise));
    const pesos = 5;
    var spy = function (dollars) {
      expect(dollars).toBe(null);
      done();
    };

    const dollars = currencyUtil.convertPesosToDollars(pesos, spy);
  });
});
