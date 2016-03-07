'use strict';
require('../lib/util/string')();
var currencyUtil = require('../lib/util/currency');
var sinon = require('sinon');
require('jasmine-sinon');

describe('capitalizeWords', function () {
    it('should capitalize first letters of each word of a string', function (done) {
        var str = "hello world".capitalizeWords();
        expect(str).toBe("Hello World");
        done();
    });
});

describe('convertPesosToDollars', function () {
    it('should convert an amount of pesos to dollars and the value of the dollar should be rounded to 2 decimals. Using a stub for a rest service that gives dollar value = 15.03 pesos', function (done) {

        var json = {
            "success": true,
            "terms": "https:\/\/currencylayer.com\/terms",
            "privacy": "https:\/\/currencylayer.com\/privacy",
            "timestamp": 1457293875,
            "source": "USD",
            "quotes": {
                "USDARS": 15.03
            }
        };

        spyOn(currencyUtil, 'getCurrencyDataJson').and.returnValue(json);
        const pesos = 5;
        const dollars = currencyUtil.convertPesosToDollars(pesos);
        expect(dollars).toBe(0.33);
        done();
    });
    it('should return null if the api is not available', function (done) {
        spyOn(currencyUtil, 'getCurrencyDataJson').and.returnValue(null);
        const pesos = 5;
        const dollars = currencyUtil.convertPesosToDollars(pesos);
        expect(dollars).toBe(null);
        done();
    });
});
