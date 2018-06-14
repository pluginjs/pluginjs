import $ from 'jquery'
import '@pluginjs/dropdown'
import Select from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Select', () => {
  describe('Select()', () => {
    test('should have Select', () => {
      expect(Select).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Select.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Select.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Select.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Select.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const select = new Select(element)

      expect(select).toBeObject()
      expect(select.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const select = new Select(element)

      expect(select.options).toBeObject()
      expect(select.options).toEqual(DEFAULTS)
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSelect()).toEqual($element)

      const api = $element.data('select')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asSelect()
      expect($element.asSelect('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asSelect()
      expect($element.asSelect('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('select:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSelect()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSelect()
      api = $element.data('select')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('select:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asSelect('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSelect()
      api = $element.data('select')
    })

    test('should enable the plugin', () => {
      $element.asSelect('disable')
      $element.asSelect('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('select:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSelect('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSelect()
      api = $element.data('select')
    })

    test('should disable the plugin', () => {
      $element.asSelect('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('select:disabled', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSelect('disable')
      expect(called).toEqual(1)
    })
  })
})
