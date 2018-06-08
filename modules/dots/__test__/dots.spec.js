import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Dots from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Dots', () => {
  describe('Dots()', () => {
    test('should have Dots', () => {
      expect(Dots).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Dots.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Dots.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Dots.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Dots.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const dots = new Dots(element)

      expect(dots).toBeObject()
      expect(dots.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const dots = new Dots(element)

      expect(dots.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asDots()).toEqual($element)

      const api = $element.data('dots')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asDots()
      expect($element.asDots('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asDots()
      expect($element.asDots('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('dots:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asDots()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDots()
      api = $element.data('dots')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('dots:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asDots('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDots()
      api = $element.data('dots')
    })

    test('should enable the plugin', () => {
      $element.asDots('disable')
      $element.asDots('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('dots:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asDots('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDots()
      api = $element.data('dots')
    })

    test('should disable the plugin', () => {
      $element.asDots('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('dots:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asDots('disable')
      expect(called).toEqual(1)
    })
  })
})
