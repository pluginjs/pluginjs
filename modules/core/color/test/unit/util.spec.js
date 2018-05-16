import * as util from '../../src/util'

describe('util', () => {
  describe('expandHex()', () => {
    it('should expand short hex', () => {
      expect(util.expandHex('#333')).to.equal('#333333')
      expect(util.expandHex('#123')).to.equal('#112233')
    })

    it('should return null if not a short hex', () => {
      expect(util.expandHex('#33')).to.equal(null)
    })

    it('should return the same if the value already long hex', () => {
      expect(util.expandHex('#333333')).to.equal('#333333')
    })
  })

  describe('shrinkHex()', () => {
    it('should shrink short hex', () => {
      expect(util.shrinkHex('#333333')).to.equal('#333')
      expect(util.shrinkHex('#112233')).to.equal('#123')
    })

    it('should return the value if not a long hex', () => {
      expect(util.shrinkHex('#33')).to.equal('#33')
    })

    it('should return the same if the value already short hex', () => {
      expect(util.shrinkHex('#333')).to.equal('#333')
    })
  })

  describe('parseIntFromHex()', () => {
    it('should shrink short hex', () => {
      expect(util.parseIntFromHex('0')).to.equal(0)
      expect(util.parseIntFromHex('ff')).to.equal(255)
    })
  })

  describe('isPercentage()', () => {
    it('should return true if is percentage', () => {
      expect(util.isPercentage('100%')).to.equal(true)
      expect(util.isPercentage('50%')).to.equal(true)
    })

    it('should return false if is not percentage', () => {
      expect(util.isPercentage('100')).to.equal(false)
      expect(util.isPercentage('0')).to.equal(false)
    })
  })

  describe('conventPercentageToRgb()', () => {
    it('convent percentage to rgb', () => {
      expect(util.conventPercentageToRgb('0%')).to.equal(0)
      expect(util.conventPercentageToRgb('100%')).to.equal(255)
    })
  })

  describe('convertPercentageToFloat()', () => {
    it('convent percentage to float', () => {
      expect(util.convertPercentageToFloat('0%')).to.equal(0)
      expect(util.convertPercentageToFloat('50%')).to.equal(0.5)
      expect(util.convertPercentageToFloat('100%')).to.equal(1)
    })
  })

  describe('flip()', () => {
    it('should flip the object', () => {
      expect(util.flip({ hello: 'world' })).to.eql({ world: 'hello' })
    })
  })
})
