import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Headroom from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Headroom', () => {
  describe('Headroom()', () => {
    test('should have Headroom', () => {
      expect(Headroom).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Headroom.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Headroom.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Headroom.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const headroom = new Headroom(element)

      expect(headroom).toBeObject()
      expect(headroom.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const headroom = new Headroom(element)

      expect(headroom.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asHeadroom()).toEqual($element)

      const api = $element.data('headroom')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asHeadroom()
      expect($element.asHeadroom('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asHeadroom({
        type: 'stick'
      })

      expect($element.asHeadroom('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('headroom:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asHeadroom()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHeadroom({ type: 'stick' })
      api = $element.data('headroom')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('headroom:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asHeadroom('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHeadroom()
      api = $element.data('headroom')
    })

    test('should enable the plugin', () => {
      $element.asHeadroom('disable')
      $element.asHeadroom('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('headroom:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asHeadroom('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHeadroom()
      api = $element.data('headroom')
    })

    test('should disable the plugin', () => {
      $element.asHeadroom('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('headroom:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asHeadroom('disable')
      expect(called).toEqual(1)
    })
  })
})
