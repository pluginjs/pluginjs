import Dropdown from '../src/main'
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
      const html = generateHTMLSample()
      const dropdown = Dropdown.of(html.querySelector('.dropdown-example'))

      expect(dropdown).toBeObject()
    })

    test('should have options', () => {
      const html = generateHTMLSample()
      const dropdown = Dropdown.of(html.querySelector('.dropdown-example'))

      expect(dropdown.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const html = generateHTMLSample()
      const api = Dropdown.of(html.querySelector('.dropdown-example'))

      expect(api).toEqual(api)

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const html = generateHTMLSample()
      const api = Dropdown.of(html.querySelector('.dropdown-example'))
      expect(api.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const html = generateHTMLSample()
      const api = Dropdown.of(html.querySelector('.dropdown-example'))
      api.destroy()
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('.dropdown-example')
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('dropdown:ready', () => {
        called++
      })

      api = Dropdown.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('.dropdown-example')
      api = Dropdown.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('dropdown:destroy', () => {
        called++
      })

      api.destroy()
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
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
      expect(api.is('disabled')).toBeFalse()
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
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
