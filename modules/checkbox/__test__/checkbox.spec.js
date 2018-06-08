import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Checkbox from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Checkbox', () => {
  describe('Checkbox()', () => {
    test('should have Checkbox', () => {
      expect(Checkbox).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Checkbox.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Checkbox.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Checkbox.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Checkbox.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const checkbox = new Checkbox(element)

      expect(checkbox).toBeObject()
      expect(checkbox.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const checkbox = new Checkbox(element)

      expect(checkbox.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asCheckbox()).toEqual($element)

      const api = $element.data('checkbox')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asCheckbox()
      expect($element.asCheckbox('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asCheckbox()
      $element.asCheckbox('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('checkbox:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asCheckbox()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCheckbox()
      api = $element.data('checkbox')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('checkbox:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asCheckbox('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCheckbox()
      api = $element.data('checkbox')
    })

    test('should enable the plugin', () => {
      $element.asCheckbox('disable')
      $element.asCheckbox('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('checkbox:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asCheckbox('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCheckbox()
      api = $element.data('checkbox')
    })

    test('should disable the plugin', () => {
      $element.asCheckbox('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('checkbox:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asCheckbox('disable')
      expect(called).toEqual(1)
    })
  })
})
