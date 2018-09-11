import Scrollable from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'
import '@pluginjs/scrollbar'

describe('Scrollable', () => {
  describe('Scrollable()', () => {
    test('should have Scrollable', () => {
      expect(Scrollable).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Scrollable.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Scrollable.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Scrollable.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Scrollable.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const scrollable = Scrollable.of(generateHTMLSample())

      expect(scrollable).toBeObject()
      expect(scrollable.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const scrollable = Scrollable.of(generateHTMLSample())

      expect(scrollable.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const scrollable = Scrollable.of(generateHTMLSample())
      expect(scrollable.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('scrollable:ready', () => {
        called++
      })
      const instance = Scrollable.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Scrollable.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('scrollable:destroy', () => {
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
      api = Scrollable.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('scrollable:enable', () => {
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
      api = Scrollable.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('scrollable:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
