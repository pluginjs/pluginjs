import DynamicNumber from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('dynamicNumber', () => {
  describe('dynamicNumber()', () => {
    test('should have dynamicNumber', () => {
      expect(DynamicNumber).toBeFunction()
    })

    test('should have defaults', () => {
      expect(DynamicNumber.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(DynamicNumber.events).toBeObject()
    })

    test('should have methods', () => {
      expect(DynamicNumber.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = generateHTMLSample()

      const dynamicNumber = DynamicNumber.of(element)

      expect(dynamicNumber).toBeObject()
      expect(dynamicNumber.options).toBeObject(DEFAULTS)
    })

    test('should have options', () => {
      const dynamicNumber = DynamicNumber.of(generateHTMLSample(), {
        from: 0,
        to: 30
      })

      expect(dynamicNumber.options).toBeObject()
      expect(dynamicNumber.options.from).toBeNumber()
      expect(dynamicNumber.options.from).toEqual(0)
      expect(dynamicNumber.options.to).toEqual(30)
    })
  })

  describe('api call', () => {
    test('should call start', () => {
      const $element = DynamicNumber.of(generateHTMLSample())
      $element.start()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('dynamicNumber:ready', () => {
        called++
      })

      const instance = DynamicNumber.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = DynamicNumber.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('dynamicNumber:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })
})
