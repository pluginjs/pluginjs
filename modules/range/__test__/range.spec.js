import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/units'
import Range from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Range', () => {
  describe('Range()', () => {
    test('should have Range', () => {
      expect(Range).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Range.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Range.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Range.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Range.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const range = new Range(element)

      expect(range).toBeObject()
      expect(range.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const range = new Range(element)

      expect(range.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asRange()).toEqual($element)

      const api = $element.data('range')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asRange()
      expect($element.asRange('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asRange()
      $element.asRange('destroy')
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

      $element.on('range:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asRange()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRange()
      api = $element.data('range')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('range:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asRange('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRange()
      api = $element.data('range')
    })

    test('should enable the plugin', () => {
      $element.asRange('disable')
      $element.asRange('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('range:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asRange('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRange()
      api = $element.data('range')
    })

    test('should disable the plugin', () => {
      $element.asRange('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('range:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asRange('disable')
      expect(called).toEqual(1)
    })
  })
})
