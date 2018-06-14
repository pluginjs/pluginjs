import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Scrollable from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/scrollbar'

describe('Scrollable', () => {
  describe('Scrollable()', () => {
    test('should have Scrollable', () => {
      expect(Scrollable).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Scrollable.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Scrollable.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Scrollable.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Scrollable.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollable = new Scrollable(element)

      expect(scrollable).toBeObject()
      // expect(scrollable.options).toEqual(DEFAULTS);
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollable = new Scrollable(element)

      expect(scrollable.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollable()).toEqual($element)

      const api = $element.data('scrollable')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollable()
      expect($element.asScrollable('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollable()
      expect($element.asScrollable('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('scrollable:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asScrollable()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollable()
      api = $element.data('scrollable')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollable:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asScrollable('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollable()
      api = $element.data('scrollable')
    })

    test('should enable the plugin', () => {
      $element.asScrollable('disable')
      $element.asScrollable('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('scrollable:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asScrollable('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollable()
      api = $element.data('scrollable')
    })

    test('should disable the plugin', () => {
      $element.asScrollable('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('scrollable:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asScrollable('disable')
      expect(called).toEqual(1)
    })
  })
})
