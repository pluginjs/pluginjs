import * as util from '../src/util'

describe('util', () => {
  describe('flip()', () => {
    test('should flip the object', () => {
      expect(util.flip({ hello: 'world' })).toEqual({ world: 'hello' })
    })
  })

  describe('reverseDirection()', () => {
    test('should return reverse direction', () => {
      expect(util.reverseDirection('top')).toEqual('bottom')
    })
  })

  describe('isDirection()', () => {
    test('should return true if string is direction', () => {
      expect(util.isDirection('top')).toEqual(true)
    })

    test('should return false if string is not direction', () => {
      expect(util.isDirection('topp')).toEqual(false)
    })
  })
})
