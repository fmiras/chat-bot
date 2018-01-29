require('jasmine-sinon')
const { capitalizeWords } = require('../lib/util/string')
const sinon = require('sinon')
const rewire = require('rewire')
const currencyUtil = rewire('../lib/util/currency')

describe('capitalizeWords', () => {
  it('should capitalize first letters of each word of a string', () => {
    const str = capitalizeWords('hello world')
    expect(str).toBe('Hello World')
  })
})

describe('convertPesosToDollars', () => {
  it('should convert an amount of pesos to dollars and the value of the dollar ' +
      'should be rounded to 2 decimals.' +
      ' Using a stub for a rest service that gives dollar value = 15.03 pesos', done => {
    const currencyDataJsonStub = {
      success: true,
      terms: 'https://currencylayer.com/terms',
      privacy: 'https://currencylayer.com/privacy',
      timestamp: 1457293875,
      source: 'USD',
      quotes: {
        USDARS: 15.03
      }
    }
    const promise = new Promise((resolve, reject) => {
      resolve(currencyDataJsonStub)
    })

    currencyUtil.__set__('getCurrencyData', sinon.stub().returns(promise))
    const pesos = 5

    const spy = dollars => {
      expect(dollars).toBe(0.33)
      done()
    }

    currencyUtil.convertPesosToDollars(pesos, spy)
  })

  it('should return null if the api is not available', done => {
    const promise = new Promise((resolve, reject) => {
      reject(new Error())
    })

    currencyUtil.__set__('getCurrencyData', sinon.stub().returns(promise))
    const pesos = 5
    const spy = dollars => {
      expect(dollars).toBe(null)
      done()
    }

    currencyUtil.convertPesosToDollars(pesos, spy)
  })
})
