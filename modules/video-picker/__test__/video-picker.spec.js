import $ from 'jquery'
import '@pluginjs/video'
import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import VideoPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('VideoPicker', () => {
  describe('VideoPicker()', () => {
    test('should have VideoPicker', () => {
      expect(VideoPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(VideoPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(VideoPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(VideoPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(VideoPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('input')
      const videoPicker = new VideoPicker(element)

      expect(videoPicker).toBeObject()
      expect(videoPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('input')
      const videoPicker = new VideoPicker(element)

      expect(videoPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('input')
      const $element = $(element)

      expect($element.asVideoPicker()).toEqual($element)

      const api = $element.data('videoPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('input')).asVideoPicker()
      expect($element.asVideoPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('input')).asVideoPicker()
      $element.asVideoPicker('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('input'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('videoPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asVideoPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asVideoPicker()
      api = $element.data('videoPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('videoPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asVideoPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asVideoPicker()
      api = $element.data('videoPicker')
    })

    test('should enable the plugin', () => {
      $element.asVideoPicker('disable')
      $element.asVideoPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('videoPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asVideoPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asVideoPicker()
      api = $element.data('videoPicker')
    })

    test('should disable the plugin', () => {
      $element.asVideoPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('videoPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asVideoPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
