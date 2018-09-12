import Zoom from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Zoom', () => {
  describe('Zoom()', () => {
    test('should have Zoom', () => {
      expect(Zoom).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Zoom.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Zoom.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Zoom.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Zoom.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const api = Zoom.of(generateHTMLSample())

      expect(api).toBeObject()
      expect(api.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const zoom = Zoom.of(generateHTMLSample())

      expect(zoom.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const api = Zoom.of(generateHTMLSample())
      expect(api.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('zoom:ready', () => {
        called++
      })

      const instance = Zoom.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Zoom.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('zoom:destroy', () => {
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
      api = Zoom.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('zoom:enable', () => {
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
      api = Zoom.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()
      console.log(22)

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('zoom:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
