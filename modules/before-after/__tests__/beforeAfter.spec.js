import BeforeAfter from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('BeforeAfter', () => {
  describe('BeforeAfter()', () => {
    test('should have BeforeAfter', () => {
      expect(BeforeAfter).toBeFunction()
    })

    test('should have defaults', () => {
      expect(BeforeAfter.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(BeforeAfter.events).toBeObject()
    })

    test('should have classes', () => {
      expect(BeforeAfter.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(BeforeAfter.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const beforeAfter = BeforeAfter.of(generateHTMLSample())

      expect(beforeAfter).toBeObject()
      expect(beforeAfter.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const beforeAfter = BeforeAfter.of(generateHTMLSample())

      expect(beforeAfter.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = BeforeAfter.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:ready', () => {
        called++
      })

      const instance = BeforeAfter.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BeforeAfter.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BeforeAfter.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BeforeAfter.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
