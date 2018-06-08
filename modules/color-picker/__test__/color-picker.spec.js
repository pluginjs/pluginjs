import $ from 'jquery'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import ColorPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ColorPicker', () => {
  describe('ColorPicker()', () => {
    test('should have ColorPicker', () => {
      expect(ColorPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ColorPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ColorPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ColorPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ColorPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const colorPicker = new ColorPicker(element)

      expect(colorPicker).toBeObject()
      expect(colorPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const colorPicker = new ColorPicker(element)

      expect(colorPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asColorPicker()).toEqual($element)

      const api = $element.data('colorPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asColorPicker()
      expect($element.asColorPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asColorPicker()
      $element.asColorPicker('destroy')
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

      $element.on('colorPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asColorPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asColorPicker()
      api = $element.data('colorPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('colorPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asColorPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asColorPicker()
      api = $element.data('colorPicker')
    })

    test('should enable the plugin', () => {
      $element.asColorPicker('disable')
      $element.asColorPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('colorPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asColorPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asColorPicker()
      api = $element.data('colorPicker')
    })

    test('should disable the plugin', () => {
      $element.asColorPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('colorPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asColorPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
