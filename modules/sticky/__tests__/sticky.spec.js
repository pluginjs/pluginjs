import Sticky from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Sticky', () => {
  describe('Sticky()', () => {
    test('should have Sticky', () => {
      expect(Sticky).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Sticky.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Sticky.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Sticky.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Sticky.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const sticky = Sticky.of(generateHTMLSample())

      expect(sticky).toBeObject()
      expect(sticky.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const sticky = Sticky.of(generateHTMLSample())

      expect(sticky.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const sticky = Sticky.of(generateHTMLSample())
      expect(sticky.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const sticky = Sticky.of(generateHTMLSample())
      sticky.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('sticky:ready', () => {
        called++
      })

      const instance = Sticky.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Sticky.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('sticky:destroy', () => {
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
      api = Sticky.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('sticky:enable', () => {
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
      api = Sticky.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('sticky:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
