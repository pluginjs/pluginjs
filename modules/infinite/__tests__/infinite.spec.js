import Infinite from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/scroll-end'

describe('Infinite', () => {
  describe('Infinite()', () => {
    test('should have Infinite', () => {
      expect(Infinite).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Infinite.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Infinite.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Infinite.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const infinite = new Infinite(element)

      expect(infinite).toBeObject()
      expect(infinite.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const infinite = new Infinite(element)

      expect(infinite.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asInfinite()).toEqual($element)

      const api = $element.data('infinite')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asInfinite()
      expect($element.asInfinite('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asInfinite()

      expect($element.asInfinite('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('infinite:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asInfinite()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInfinite()
      api = $element.data('infinite')
    })

    test('should trigger destroy event', () => {
      let called = 0
      $element.on('infinite:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asInfinite('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInfinite()
      api = $element.data('infinite')
    })

    test('should enable the plugin', () => {
      $element.asInfinite('disable')
      $element.asInfinite('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('infinite:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asInfinite('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInfinite()
      api = $element.data('infinite')
    })

    test('should disable the plugin', () => {
      $element.asInfinite('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('infinite:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asInfinite('disable')
      expect(called).toEqual(1)
    })
  })
})
