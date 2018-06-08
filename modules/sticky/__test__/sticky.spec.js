import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Sticky from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Sticky', () => {
  describe('Sticky()', () => {
    test('should have Sticky', () => {
      expect(Sticky).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Sticky.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Sticky.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Sticky.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Sticky.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const sticky = new Sticky(element)

      expect(sticky).toBeObject()
      expect(sticky.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const sticky = new Sticky(element)

      expect(sticky.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSticky()).toEqual($element)

      const api = $element.data('sticky')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asSticky()
      expect($element.asSticky('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asSticky()
      $element.asSticky('destroy')
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

      $element.on('sticky:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSticky()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSticky()
      api = $element.data('sticky')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('sticky:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asSticky('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSticky()
      api = $element.data('sticky')
    })

    test('should enable the plugin', () => {
      $element.asSticky('disable')
      $element.asSticky('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('sticky:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSticky('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSticky()
      api = $element.data('sticky')
    })

    test('should disable the plugin', () => {
      $element.asSticky('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('sticky:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSticky('disable')
      expect(called).toEqual(1)
    })
  })
})
