import '@pluginjs/tooltip'
import '@pluginjs/dropdown'
import '@pluginjs/units'
import Offset from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Offset', () => {
  describe('Offset()', () => {
    test('should have Offset', () => {
      expect(Offset).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Offset.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Offset.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Offset.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Offset.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const offset = Offset.of(generateHTMLSample())

      expect(offset).toBeObject()
      expect(offset.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const offset = Offset.of(generateHTMLSample())

      expect(offset.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('offset:ready', () => {
        called++
      })
      const instance = Offset.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
