import Dots from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Dots', () => {
  describe('Dots()', () => {
    test('should have Dots', () => {
      expect(Dots).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Dots.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Dots.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Dots.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Dots.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const dots = Dots.of(generateHTMLSample())

      expect(dots).toBeObject()
      expect(dots.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const dots = Dots.of(generateHTMLSample())

      expect(dots.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const dots = Dots.of(generateHTMLSample())
      expect(dots.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const dots = Dots.of(generateHTMLSample())
      dots.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('dots:ready', () => {
        called++
      })
      const instance = Dots.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Dots.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('dots:destroy', () => {
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
      api = Dots.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('dots:enable', () => {
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
      api = Dots.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('dots:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
