import Toggle from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Toggle', () => {
  describe('Toggle()', () => {
    test('should have Toggle', () => {
      expect(Toggle).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Toggle.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Toggle.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Toggle.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Toggle.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const _toggle = Toggle.of(generateHTMLSample())

      expect(_toggle).toBeObject()
      expect(_toggle.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const _toggle = Toggle.of(generateHTMLSample())

      expect(_toggle.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Toggle.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Toggle.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Toggle.of(generateHTMLSample())
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('toggle:ready', () => {
        called++
      })

      const api = Toggle.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Toggle.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('toggle:destroy', () => {
        called++
      })

      api.destroy(0)

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Toggle.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('toggle:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Toggle.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('toggle:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
