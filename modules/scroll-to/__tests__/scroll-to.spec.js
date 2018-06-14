import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import ScrollTo from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ScrollTo', () => {
  describe('ScrollTo()', () => {
    test('should have ScrollTo', () => {
      expect(ScrollTo).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollTo.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollTo.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ScrollTo.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollTo.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollTo = new ScrollTo(element)

      expect(scrollTo).toBeObject()
      expect(scrollTo.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollTo = new ScrollTo(element)

      expect(scrollTo.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollTo()).toEqual($element)

      const api = $element.data('scrollTo')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollTo()
      expect($element.asScrollTo('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollTo()
      expect($element.asScrollTo('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('scrollTo:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asScrollTo()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTo()
      api = $element.data('scrollTo')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollTo:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asScrollTo('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTo()
      api = $element.data('scrollTo')
    })

    test('should enable the plugin', () => {
      $element.asScrollTo('disable')
      $element.asScrollTo('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('scrollTo:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asScrollTo('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTo()
      api = $element.data('scrollTo')
    })

    test('should disable the plugin', () => {
      $element.asScrollTo('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('scrollTo:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asScrollTo('disable')
      expect(called).toEqual(1)
    })
  })
})
