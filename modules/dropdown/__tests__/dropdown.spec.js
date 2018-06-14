// import jsdom from 'mocha-jsdom'
import $ from 'jquery'
// import Popper from 'popper.js'
import Dropdown from '../../src/main'
// import { defaults as DEFAULTS } from '../../src/constant'

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
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const dropdown = new Dropdown(element)

      expect(dropdown).toBeObject()
    })

    test('should have options', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const dropdown = new Dropdown(element)

      expect(dropdown.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element)

      expect($element.asDropdown()).toEqual($element)

      const api = $element.data('dropdown')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element).asDropdown()
      expect($element.asDropdown('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element).asDropdown()
      expect($element.asDropdown('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('dropdown:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asDropdown()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element).asDropdown()
      // api =
      $element.data('dropdown')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('dropdown:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asDropdown('destroy')
      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element).asDropdown()
      api = $element.data('dropdown')
    })

    test('should enable the plugin', () => {
      $element.asDropdown('disable')
      $element.asDropdown('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('dropdown:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asDropdown('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element).asDropdown()
      api = $element.data('dropdown')
    })

    test('should disable the plugin', () => {
      $element.asDropdown('disable')
      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('dropdown:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asDropdown('disable')
      expect(called).toEqual(1)
    })
  })
})
