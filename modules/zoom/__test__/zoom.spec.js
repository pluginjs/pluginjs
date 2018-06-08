import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Zoom from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Zoom', () => {
  describe('Zoom()', () => {
    test('should have Zoom', () => {
      expect(Zoom).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Zoom.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Zoom.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Zoom.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Zoom.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const zoom = new Zoom(element)

      expect(zoom).toBeObject()
      expect(zoom.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const zoom = new Zoom(element)

      expect(zoom.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asZoom()).toEqual($element)

      const api = $element.data('zoom')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asZoom()
      expect($element.asZoom('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asZoom()
      $element.asZoom('destroy')
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

      $element.on('zoom:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asZoom()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asZoom()
      api = $element.data('zoom')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('zoom:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asZoom('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asZoom()
      api = $element.data('zoom')
    })

    test('should enable the plugin', () => {
      $element.asZoom('disable')
      $element.asZoom('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('zoom:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asZoom('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asZoom()
      api = $element.data('zoom')
    })

    test('should disable the plugin', () => {
      $element.asZoom('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('zoom:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asZoom('disable')
      expect(called).toEqual(1)
    })
  })
})
