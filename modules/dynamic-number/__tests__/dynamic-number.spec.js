import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import DynamicNumber from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('dynamicNumber', () => {
  describe('dynamicNumber()', () => {
    test('should have dynamicNumber', () => {
      expect(DynamicNumber).toBeFunction()
    })

    test('should have defaults', () => {
      expect(DynamicNumber.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(DynamicNumber.events).toBeObject()
    })

    test('should have methods', () => {
      expect(DynamicNumber.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      $(element).attr({
        'data-from': '0',
        'data-to': '30'
      })

      const dynamicNumber = new DynamicNumber(element)

      expect(dynamicNumber).toBeObject()
      expect(dynamicNumber.options).toBeObject()
      expect(dynamicNumber.options.from).toBeNumber()
      expect(dynamicNumber.options.from).toEqual(0)
      expect(dynamicNumber.options.to).toEqual(30)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const dynamicNumber = new DynamicNumber(element, {
        from: 0,
        to: 30
      })

      expect(dynamicNumber.options).toBeObject()
      expect(dynamicNumber.options.from).toBeNumber()
      expect(dynamicNumber.options.from).toEqual(0)
      expect(dynamicNumber.options.to).toEqual(30)
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asDynamicNumber()).toEqual($element)

      const api = $element.data('dynamicNumber')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should call start', () => {
      const $element = $(document.createElement('div'))
      expect($element.is('start')).toBeFalse()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asDynamicNumber()
      expect($element.asDynamicNumber('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('dynamicNumber:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asDynamicNumber()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDynamicNumber()
      api = $element.data('asDynamicNumber')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('dynamicNumber:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asDynamicNumber('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('start()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDynamicNumber()
      api = $element.data('asDynamicNumber')
    })

    test('should trigger start event', () => {
      let called = 0

      $element.on('dynamicNumber:start', (event, api) => {
        expect(api.is('start')).toBeTrue()
        called++
      })

      $element.asDynamicNumber('start')

      expect(called).toEqual(1)
    })
  })
})
