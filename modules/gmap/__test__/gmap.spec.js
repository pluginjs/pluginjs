import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Gmap from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Gmap', () => {
  describe('Gmap()', () => {
    test('should have Gmap', () => {
      expect(Gmap).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Gmap.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Gmap.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Gmap.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Gmap.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const gmap = new Gmap(element)

      expect(gmap).toBeObject()
      expect(gmap.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const gmap = new Gmap(element)

      expect(gmap.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGmap()).toEqual($element)

      const api = $element.data('gmap')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asGmap()
      expect($element.asGmap('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asGmap()
      expect($element.asGmap('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('gmap:ready', (event, api) => {
        // expect(api.is('initialized')).toBeTrue();
        called++
        expect(called).toEqual(1)
      })

      $element.asGmap()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGmap()
      api = $element.data('gmap')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('gmap:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asGmap('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGmap()
      api = $element.data('gmap')
    })

    test('should enable the plugin', () => {
      $element.asGmap('disable')
      $element.asGmap('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('gmap:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asGmap('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGmap()
      api = $element.data('gmap')
    })

    test('should disable the plugin', () => {
      $element.asGmap('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('gmap:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asGmap('disable')
      expect(called).toEqual(1)
    })
  })
})
