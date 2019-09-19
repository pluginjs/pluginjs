import Shares from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Shares', () => {
  describe('Shares()', () => {
    test('should have Shares', () => {
      expect(Shares).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Shares.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Shares.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Shares.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Shares.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const shares = Shares.of(generateHTMLSample())

      expect(shares).toBeObject()
      expect(shares.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const shares = Shares.of(generateHTMLSample())

      expect(shares.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('shares:ready', () => {
        called++
      })
      const instance = Shares.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
