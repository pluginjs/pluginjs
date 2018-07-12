import Swipe from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Swipe', () => {
  describe('Swipe()', () => {
    test('should have Swipe', () => {
      expect(Swipe).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Swipe.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Swipe.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Swipe.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Swipe.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const swipe = Swipe.of(generateHTMLSample())

      expect(swipe).toBeObject()
      expect(swipe.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const swipe = Swipe.of(generateHTMLSample())

      expect(swipe.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const swipe = Swipe.of(generateHTMLSample())
      expect(swipe.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const swipe = Swipe.of(generateHTMLSample())
      swipe.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('swipe:ready', () => {
        called++
      })
      const instance = Swipe.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Swipe.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('swipe:destroy', () => {
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
      api = Swipe.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('swipe:enable', () => {
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
      api = Swipe.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('swipe:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
