import Tooltip from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Tooltip', () => {
  describe('Tooltip()', () => {
    test('should have Tooltip', () => {
      expect(Tooltip).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tooltip.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tooltip.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tooltip.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tooltip.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const tooltip = Tooltip.of(generateHTMLSample())

      expect(tooltip).toBeObject()
      expect(tooltip.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const tooltip = Tooltip.of(generateHTMLSample())

      expect(tooltip.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const tooltip = Tooltip.of(generateHTMLSample())
      expect(tooltip.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('tooltip:ready', () => {
        called++
      })
      const instance = Tooltip.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Tooltip.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('tooltip:destroy', () => {
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
      api = Tooltip.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('tooltip:enable', () => {
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
      api = Tooltip.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('tooltip:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
