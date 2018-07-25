import ScrollTop from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ScrollTop', () => {
  describe('ScrollTop()', () => {
    test('should have ScrollTop', () => {
      expect(ScrollTop).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollTop.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollTop.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ScrollTop.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollTop.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollTop = new ScrollTop(element)
      expect(scrollTop).toBeObject()
      expect(scrollTop.options.theme).toEqual('default')
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollTop = new ScrollTop(element)

      expect(scrollTop.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollTop()).toEqual($element)

      const api = $element.data('scrollTop')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollTop()
      expect($element.asScrollTop('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollTop()
      expect($element.asScrollTop('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('scrollTop:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asScrollTop()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTop()
      api = $element.data('scrollTop')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollTop:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asScrollTop('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTop()
      api = $element.data('scrollTop')
    })

    test('should enable the plugin', () => {
      $element.asScrollTop('disable')
      $element.asScrollTop('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('scrollTop:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asScrollTop('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTop()
      api = $element.data('scrollTop')
    })

    test('should disable the plugin', () => {
      $element.asScrollTop('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('scrollTop:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asScrollTop('disable')
      expect(called).toEqual(1)
    })
  })
})
