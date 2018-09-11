import Magnify from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Magnify', () => {
  describe('Magnify()', () => {
    test('should have Magnify', () => {
      expect(Magnify).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Magnify.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Magnify.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Magnify.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Magnify.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const magnify = Magnify.of(generateHTMLSample())

      expect(magnify).toBeObject()
      expect(magnify.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const magnify = Magnify.of(generateHTMLSample())

      expect(magnify.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('magnify:ready', () => {
        called++
      })
      const instance = Magnify.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
