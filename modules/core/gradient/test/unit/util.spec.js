import * as util from '../../src/util'

describe('util', () => {
  describe('flip()', () => {
    it('should flip the object', () => {
      expect(util.flip({ hello: 'world' })).to.eql({ world: 'hello' })
    })
  })

  describe('reverseDirection()', () => {
    it('should return reverse direction', () => {
      expect(util.reverseDirection('top')).to.be.equal('bottom')
    })
  })

  describe('isDirection()', () => {
    it('should return true if string is direction', () => {
      expect(util.isDirection('top')).to.be.equal(true)
    })

    it('should return false if string is not direction', () => {
      expect(util.isDirection('topp')).to.be.equal(false)
    })
  })
})
