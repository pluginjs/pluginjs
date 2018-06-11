import Units from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Units', () => {
  describe('Units()', () => {
    test('should have Units', () => {
      expect(Units).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Units.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Units.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Units.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Units.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const units = Units.of(generateHTMLSample())

      expect(units).toBeObject()
      expect(units.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const units = Units.of(generateHTMLSample())

      expect(units.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('units:ready', () => {
        called++
      })
      const instance = Units.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
