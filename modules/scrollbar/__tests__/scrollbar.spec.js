import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Scrollbar from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Scrollbar', () => {
  describe('Scrollbar()', () => {
    test('should have Scrollbar', () => {
      expect(Scrollbar).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Scrollbar.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Scrollbar.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Scrollbar.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Scrollbar.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollbar = new Scrollbar(element)

      expect(scrollbar).toBeObject()
      expect(scrollbar.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollbar = new Scrollbar(element)

      expect(scrollbar.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollbar()).toEqual($element)

      const api = $element.data('scrollbar')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollbar()
      expect($element.asScrollbar('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollbar()
      expect($element.asScrollbar('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('scrollbar:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asScrollbar()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollbar()
      api = $element.data('scrollbar')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollbar:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asScrollbar('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollbar()
      api = $element.data('scrollbar')
    })

    test('should enable the plugin', () => {
      $element.asScrollbar('disable')
      $element.asScrollbar('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('scrollbar:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asScrollbar('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollbar()
      api = $element.data('scrollbar')
    })

    test('should disable the plugin', () => {
      $element.asScrollbar('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('scrollbar:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asScrollbar('disable')
      expect(called).toEqual(1)
    })
  })
})
