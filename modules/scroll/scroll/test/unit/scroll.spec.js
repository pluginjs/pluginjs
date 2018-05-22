import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import scroll from '../../src/main'

describe('scroll', () => {
  it('should have scroll', () => {
    expect(scroll).to.be.an('object')
  })
})
