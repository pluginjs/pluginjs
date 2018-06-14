// import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/scrollable'
import '@pluginjs/tooltip'
import IconPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('IconPicker', () => {
  describe('IconPicker()', () => {
    test('should have IconPicker', () => {
      expect(IconPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(IconPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(IconPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(IconPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(IconPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const iconPicker = new IconPicker(element)

      expect(iconPicker).toBeObject()
      expect(iconPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const iconPicker = new IconPicker(element)

      expect(iconPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asIconPicker()).toEqual($element)

      const api = $element.data('iconPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asIconPicker()
      expect($element.asIconPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asIconPicker()
      $element.asIconPicker('destroy')
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

      $element.on('iconPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asIconPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asIconPicker()
      // api =
      $element.data('iconPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('iconPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asIconPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asIconPicker()
      api = $element.data('iconPicker')
    })

    test('should enable the plugin', () => {
      $element.asIconPicker('disable')
      $element.asIconPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('iconPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asIconPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asIconPicker()
      api = $element.data('iconPicker')
    })

    test('should disable the plugin', () => {
      $element.asIconPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('iconPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asIconPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
