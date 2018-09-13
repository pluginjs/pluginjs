import Collapse from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Collapse', () => {
  describe('Collapse()', () => {
    test('should have Collapse', () => {
      expect(Collapse).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Collapse.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Collapse.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Collapse.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Collapse.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const collapse = Collapse.of(generateHTMLSample())

      expect(collapse).toBeObject()
      expect(collapse.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const collapse = Collapse.of(generateHTMLSample())

      expect(collapse.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Collapse.of(generateHTMLSample())
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

      $element.addEventListener('collapse:ready', () => {
        called++
      })

      const instance = Collapse.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Collapse.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('collapse:destroy', () => {
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
      api = Collapse.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('collapse:enable', () => {
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
      api = Collapse.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('collapse:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()

      expect(called).toEqual(1)
    })
  })
})
