import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import scrollEnd from '../../src/main'

describe('scrollEnd', () => {
  it('should have scrollEnd', () => {
    expect(scrollEnd).to.be.an('object')
  })
})
