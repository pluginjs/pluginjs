import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import scroll from '../../src/main'

describe('scroll', () => {
  test('should have scroll', () => {
    expect(scroll).toBeObject()
  })
})
