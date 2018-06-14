import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Rate from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Rate', () => {
  describe('Rate()', () => {
    test('should have Rate', () => {
      expect(Rate).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Rate.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Rate.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Rate.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Rate.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const rate = new Rate(element)

      expect(rate).toBeObject()
      expect(rate.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const rate = new Rate(element)

      expect(rate.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asRate()).toEqual($element)

      const api = $element.data('rate')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asRate()
      expect($element.asRate('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asRate()
      expect($element.asRate('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('rate:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asRate()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRate()
      api = $element.data('rate')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('rate:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asRate('destroy')

      expect(called).toEqual(1)
    })
  })
})
