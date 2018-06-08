import $ from 'jquery'
import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import PatternPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('PatternPicker', () => {
  describe('PatternPicker()', () => {
    test('should have PatternPicker', () => {
      expect(PatternPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PatternPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(PatternPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(PatternPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(PatternPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const patternPicker = new PatternPicker(element)

      expect(patternPicker).toBeObject()
      expect(patternPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const patternPicker = new PatternPicker(element)

      expect(patternPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPatternPicker()).toEqual($element)

      const api = $element.data('patternPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asPatternPicker()
      expect($element.asPatternPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asPatternPicker()
      $element.asPatternPicker('destroy')
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

      $element.on('patternPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asPatternPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPatternPicker()
      api = $element.data('patternPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('patternPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asPatternPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPatternPicker()
      api = $element.data('patternPicker')
    })

    test('should enable the plugin', () => {
      $element.asPatternPicker('disable')
      $element.asPatternPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('patternPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asPatternPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPatternPicker()
      api = $element.data('patternPicker')
    })

    test('should disable the plugin', () => {
      $element.asPatternPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('patternPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asPatternPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
