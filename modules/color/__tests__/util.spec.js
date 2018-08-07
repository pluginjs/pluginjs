import * as util from '../src/util'

describe('util', () => {
  describe('expandHex()', () => {
    test('should expand short hex', () => {
      expect(util.expandHex('#333')).toEqual('#333333')
      expect(util.expandHex('#123')).toEqual('#112233')
    })

    test('should return null if not a short hex', () => {
      expect(util.expandHex('#33')).toEqual(null)
    })

    test('should return the same if the value already long hex', () => {
      expect(util.expandHex('#333333')).toEqual('#333333')
    })
  })

  describe('shrinkHex()', () => {
    test('should shrink short hex', () => {
      expect(util.shrinkHex('#333333')).toEqual('#333')
      expect(util.shrinkHex('#112233')).toEqual('#123')
    })

    test('should return the value if not a long hex', () => {
      expect(util.shrinkHex('#33')).toEqual('#33')
    })

    test('should return the same if the value already short hex', () => {
      expect(util.shrinkHex('#333')).toEqual('#333')
    })
  })

  describe('parseIntFromHex()', () => {
    test('should shrink short hex', () => {
      expect(util.parseIntFromHex('0')).toEqual(0)
      expect(util.parseIntFromHex('ff')).toEqual(255)
    })
  })

  describe('isPercentage()', () => {
    test('should return true if is percentage', () => {
      expect(util.isPercentage('100%')).toEqual(true)
      expect(util.isPercentage('50%')).toEqual(true)
    })

    test('should return false if is not percentage', () => {
      expect(util.isPercentage('100')).toEqual(false)
      expect(util.isPercentage('0')).toEqual(false)
    })
  })

  describe('conventPercentageToRgb()', () => {
    test('convent percentage to rgb', () => {
      expect(util.conventPercentageToRgb('0%')).toEqual(0)
      expect(util.conventPercentageToRgb('100%')).toEqual(255)
    })
  })

  describe('convertPercentageToFloat()', () => {
    test('convent percentage to float', () => {
      expect(util.convertPercentageToFloat('0%')).toEqual(0)
      expect(util.convertPercentageToFloat('50%')).toEqual(0.5)
      expect(util.convertPercentageToFloat('100%')).toEqual(1)
    })
  })

  describe('flip()', () => {
    test('should flip the object', () => {
      expect(util.flip({ hello: 'world' })).toEqual({ world: 'hello' })
    })
  })
})
