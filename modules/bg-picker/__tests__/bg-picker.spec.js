import $ from 'jquery'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/dropdown'
import BgPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const inputValue = `{
  'repeat':'repeat-x',
  'position':'center center',
  'attachment':'inherit',
  'image': 'http://via.placeholder.com/350x150'
}`
describe('BgPicker', () => {
  describe('BgPicker()', () => {
    test('should have BgPicker', () => {
      expect(BgPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(BgPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(BgPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(BgPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(BgPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('input')
      element.value = inputValue
      const bgPicker = new BgPicker(element)

      expect(bgPicker).toBeObject()
      expect(bgPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('input')
      element.value = inputValue
      const bgPicker = new BgPicker(element)

      expect(bgPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('input')
      element.value = inputValue
      const $element = $(element)

      expect($element.asBgPicker()).toEqual($element)

      const api = $element.data('bgPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('input')
      element.value = inputValue
      const $element = $(element).asBgPicker()
      expect($element.asBgPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('input')
      element.value = inputValue
      const $element = $(element).asBgPicker()
      $element.asBgPicker('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('input')
      element.value = inputValue
      $element = $(element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('bgPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asBgPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      const element = document.createElement('input')
      element.value = inputValue
      $element = $(element).asBgPicker()
      // api =
      $element.data('bgPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('bgPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asBgPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('input')
      element.value = inputValue
      $element = $(element).asBgPicker()
      api = $element.data('bgPicker')
    })

    test('should enable the plugin', () => {
      $element.asBgPicker('disable')
      $element.asBgPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('bgPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asBgPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('input')
      element.value = inputValue
      $element = $(element).asBgPicker()
      api = $element.data('bgPicker')
    })

    test('should disable the plugin', () => {
      $element.asBgPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('bgPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asBgPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
