import Scrollbar from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Scrollbar', () => {
  describe('Scrollbar()', () => {
    test('should have Scrollbar', () => {
      expect(Scrollbar).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Scrollbar.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Scrollbar.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Scrollbar.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Scrollbar.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const scrollbar = Scrollbar.of(generateHTMLSample())

      expect(scrollbar).toBeObject()
      expect(scrollbar.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const scrollbar = Scrollbar.of(generateHTMLSample())

      expect(scrollbar.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const scrollbar = Scrollbar.of(generateHTMLSample())
      expect(scrollbar.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const scrollbar = Scrollbar.of(generateHTMLSample())
      scrollbar.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('scrollbar:ready', () => {
        called++
      })
      const instance = Scrollbar.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Scrollbar.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('scrollbar:destroy', () => {
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
      api = Scrollbar.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('scrollbar:enable', () => {
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
      api = Scrollbar.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('scrollbar:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
