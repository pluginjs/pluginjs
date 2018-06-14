import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import ScrollProgress from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ScrollProgress', () => {
  describe('ScrollProgress()', () => {
    test('should have ScrollProgress', () => {
      expect(ScrollProgress).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollProgress.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollProgress.events).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollProgress.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollProgress = new ScrollProgress(element)

      expect(scrollProgress).toBeObject()
      expect(scrollProgress.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollProgress = new ScrollProgress(element)

      expect(scrollProgress.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollProgress()).toEqual($element)

      const api = $element.data('scrollProgress')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollProgress()
      expect($element.asScrollProgress('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollProgress()
      expect($element.asScrollProgress('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('scrollProgress:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asScrollProgress()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollProgress()
      api = $element.data('scrollProgress')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollProgress:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asScrollProgress('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollProgress()
      api = $element.data('scrollProgress')
    })

    test('should enable the plugin', () => {
      $element.asScrollProgress('disable')
      $element.asScrollProgress('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('scrollProgress:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asScrollProgress('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollProgress()
      api = $element.data('scrollProgress')
    })

    test('should disable the plugin', () => {
      $element.asScrollProgress('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('scrollProgress:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asScrollProgress('disable')
      expect(called).toEqual(1)
    })
  })
})
