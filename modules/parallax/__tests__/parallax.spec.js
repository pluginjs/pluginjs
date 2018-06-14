import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Parallax from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Parallax', () => {
  describe('Parallax()', () => {
    test('should have Parallax', () => {
      expect(Parallax).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Parallax.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Parallax.events).toBeObject()
    })
    test('should have methods', () => {
      expect(Parallax.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const parallax = new Parallax(element)

      expect(parallax).toBeObject()
      expect(parallax.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const parallax = new Parallax(element)

      expect(parallax.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asParallax()).toEqual($element)

      const api = $element.data('parallax')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asParallax()
      expect($element.asParallax('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asParallax()
      $element.asParallax('destroy')
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

      $element.on('parallax:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asParallax()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asParallax()
      api = $element.data('parallax')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('parallax:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asParallax('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asParallax()
      api = $element.data('parallax')
    })

    test('should enable the plugin', () => {
      $element.asParallax('disable')
      $element.asParallax('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('parallax:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asParallax('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asParallax()
      api = $element.data('parallax')
    })

    test('should disable the plugin', () => {
      $element.asParallax('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('parallax:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asParallax('disable')
      expect(called).toEqual(1)
    })
  })
})
