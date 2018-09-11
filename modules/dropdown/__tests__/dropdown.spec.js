import Dropdown from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Dropdown', () => {
  describe('Dropdown()', () => {
    test('should have Dropdown', () => {
      expect(Dropdown).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Dropdown.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Dropdown.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Dropdown.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Dropdown.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const dropdown = Dropdown.of(
        generateHTMLSample().querySelector('.dropdown-example')
      )

      expect(dropdown).toBeObject()
      expect(dropdown.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const dropdown = Dropdown.of(
        generateHTMLSample().querySelector('.dropdown-example')
      )

      expect(dropdown.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const api = Dropdown.of(
        generateHTMLSample().querySelector('.dropdown-example')
      )
      expect(api.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('.dropdown-example')
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('dropdown:ready', () => {
        called++
      })

      const instance = Dropdown.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('.dropdown-example')
      api = Dropdown.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('dropdown:destroy', () => {
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
      $element = generateHTMLSample().querySelector('.dropdown-example')
      api = Dropdown.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('dropdown:enable', () => {
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
      $element = generateHTMLSample().querySelector('.dropdown-example')
      api = Dropdown.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()
      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('dropdown:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
