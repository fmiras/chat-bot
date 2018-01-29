require('jasmine-sinon')
const { capitalizeWords } = require('../lib/util/string')

describe('capitalizeWords', () => {
  it('should capitalize first letters of each word of a string', () => {
    const str = capitalizeWords('hello world')
    expect(str).toBe('Hello World')
  })
})
