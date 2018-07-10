import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/scrollable'
import Swipe from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Swipe', () => {
  describe('Swipe()', () => {
    test('should have Swipe', () => {
      expect(Swipe).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Swipe.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Swipe.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Swipe.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Swipe.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const swipe = new Swipe(element)

      expect(swipe).toBeObject()
      expect(swipe.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const swipe = new Swipe(element)

      expect(swipe.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSvgPicker()).toEqual($element)

      const api = $element.data('svgPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asSvgPicker()
      expect($element.asSvgPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asSvgPicker()
      $element.asSvgPicker('destroy')
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

      $element.on('svgPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSvgPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = document.createElement('div')
      api = Swipe.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('swipe:destroy', () => {
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
      $element = $(document.createElement('div')).asSvgPicker()
      api = $element.data('svgPicker')
    })

    test('should enable the plugin', () => {
      $element.asSvgPicker('disable')
      $element.asSvgPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('svgPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSvgPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSvgPicker()
      api = $element.data('svgPicker')
    })

    test('should disable the plugin', () => {
      $element.asSvgPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('svgPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSvgPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
