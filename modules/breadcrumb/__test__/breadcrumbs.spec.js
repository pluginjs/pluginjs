import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Breadcrumb from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Breadcrumb', () => {
  describe('Breadcrumb()', () => {
    test('should have Breadcrumb', () => {
      expect(Breadcrumb).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Breadcrumb.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Breadcrumb.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Breadcrumb.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Breadcrumb.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const breadcrumb = new Breadcrumb(element)

      expect(breadcrumb).toBeObject()
      expect(breadcrumb.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const breadcrumb = new Breadcrumb(element)

      expect(breadcrumb.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asBreadcrumb()).toEqual($element)

      const api = $element.data('breadcrumb')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asBreadcrumb()
      expect($element.asBreadcrumb('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asBreadcrumb()
      expect($element.asBreadcrumb('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('breadcrumb:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asBreadcrumb()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBreadcrumb()
      api = $element.data('breadcrumb')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('breadcrumb:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asBreadcrumb('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBreadcrumb()
      api = $element.data('breadcrumb')
    })

    test('should enable the plugin', () => {
      $element.asBreadcrumb('disable')
      $element.asBreadcrumb('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('breadcrumb:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asBreadcrumb('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBreadcrumb()
      api = $element.data('breadcrumb')
    })

    test('should disable the plugin', () => {
      $element.asBreadcrumb('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('breadcrumb:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asBreadcrumb('disable')
      expect(called).toEqual(1)
    })
  })
})
