import Headroom from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Headroom', () => {
  describe('Headroom()', () => {
    test('should have Headroom', () => {
      expect(Headroom).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Headroom.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Headroom.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Headroom.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Headroom.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const headroom = Headroom.of(generateHTMLSample())

      expect(headroom).toBeObject()
      expect(headroom.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const headroom = Headroom.of(generateHTMLSample())

      expect(headroom.options).toBeObject()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('headroom:ready', () => {
        called++
      })

      const instance = Headroom.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Headroom.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('headroom:destroy', () => {
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
      api = Headroom.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('headroom:enable', () => {
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
      api = Headroom.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('headroom:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
