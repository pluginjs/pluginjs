import NavToSelect from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('NavToSelect', () => {
  describe('NavToSelect()', () => {
    test('should have NavToSelect', () => {
      expect(NavToSelect).toBeFunction()
    })

    test('should have defaults', () => {
      expect(NavToSelect.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(NavToSelect.events).toBeObject()
    })

    test('should have classes', () => {
      expect(NavToSelect.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(NavToSelect.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const navToSelect = NavToSelect.of(generateHTMLSample())

      expect(navToSelect).toBeObject()
      expect(navToSelect.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const navToSelect = NavToSelect.of(generateHTMLSample())

      expect(navToSelect.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const navToSelect = NavToSelect.of(generateHTMLSample())
      expect(navToSelect.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const navToSelect = NavToSelect.of(generateHTMLSample())
      navToSelect.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('navToSelect:ready', () => {
        called++
      })

      const instance = NavToSelect.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = NavToSelect.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('navToSelect:destroy', () => {
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
      api = NavToSelect.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('navToSelect:enable', () => {
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
      api = NavToSelect.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('navToSelect:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
