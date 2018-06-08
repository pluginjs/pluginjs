import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import ScrollSpy from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ScrollSpy', () => {
  describe('ScrollSpy()', () => {
    test('should have ScrollSpy', () => {
      expect(ScrollSpy).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollSpy.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollSpy.events).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollSpy.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollSpy = new ScrollSpy(element)

      expect(scrollSpy).toBeObject()
      expect(scrollSpy.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollSpy = new ScrollSpy(element)

      expect(scrollSpy.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollSpy()).toEqual($element)

      const api = $element.data('scrollSpy')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollSpy()
      expect($element.asScrollSpy('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollSpy()
      expect($element.asScrollSpy('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('scrollSpy:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asScrollSpy()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollSpy()
      api = $element.data('scrollSpy')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollSpy:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asScrollSpy('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollSpy()
      api = $element.data('scrollSpy')
    })

    test('should enable the plugin', () => {
      $element.asScrollSpy('disable')
      $element.asScrollSpy('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('scrollSpy:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asScrollSpy('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollSpy()
      api = $element.data('scrollSpy')
    })

    test('should disable the plugin', () => {
      $element.asScrollSpy('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('scrollSpy:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asScrollSpy('disable')
      expect(called).toEqual(1)
    })
  })
})
