import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import NavToSelect from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

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
      const element = document.createElement('div')
      const navToSelect = new NavToSelect(element)

      expect(navToSelect).toBeObject()
      expect(navToSelect.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const navToSelect = new NavToSelect(element)

      expect(navToSelect.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asNavToSelect()).toEqual($element)

      const api = $element.data('navToSelect')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asNavToSelect()
      expect($element.asNavToSelect('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asNavToSelect()
      expect($element.asNavToSelect('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('navToSelect:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asNavToSelect()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asNavToSelect()
      api = $element.data('navToSelect')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('navToSelect:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asNavToSelect('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asNavToSelect()
      api = $element.data('navToSelect')
    })

    test('should enable the plugin', () => {
      $element.asNavToSelect('disable')
      $element.asNavToSelect('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('navToSelect:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asNavToSelect('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asNavToSelect()
      api = $element.data('navToSelect')
    })

    test('should disable the plugin', () => {
      $element.asNavToSelect('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('navToSelect:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asNavToSelect('disable')
      expect(called).toEqual(1)
    })
  })
})
