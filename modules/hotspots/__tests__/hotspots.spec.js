import Hotspots from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'
import '@pluginjs/tooltip'
import '@pluginjs/popover'

describe('Hotspots', () => {
  describe('Hotspots()', () => {
    test('should have Hotspots', () => {
      expect(Hotspots).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Hotspots.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Hotspots.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Hotspots.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Hotspots.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const hotspots = Hotspots.of(generateHTMLSample())

      expect(hotspots).toBeObject()
      expect(hotspots.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const hotspots = Hotspots.of(generateHTMLSample())

      expect(hotspots.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Hotspots.of(generateHTMLSample())
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

      $element.addEventListener('hotspots:ready', () => {
        called++
      })

      const instance = Hotspots.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Hotspots.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('hotspots:destroy', () => {
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
      api = Hotspots.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('hotspots:enable', () => {
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
      api = Hotspots.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('hotspots:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
