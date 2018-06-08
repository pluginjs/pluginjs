import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import scrollEnd from '../../src/main'

describe('scrollEnd', () => {
  test('should have scrollEnd', () => {
    expect(scrollEnd).toBeObject()
  })
})
