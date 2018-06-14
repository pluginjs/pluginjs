import $ from 'jquery'
import Spinner from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Spinner', () => {
  describe('Spinner()', () => {
    test('should have Spinner', () => {
      expect(Spinner).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Spinner.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Spinner.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Spinner.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Spinner.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const spinner = new Spinner(element)

      expect(spinner).toBeObject()
      expect(spinner.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const spinner = new Spinner(element)

      expect(spinner.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSpinner()).toEqual($element)

      const api = $element.data('spinner')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asSpinner()
      expect($element.asSpinner('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asSpinner()
      expect($element.asSpinner('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('spinner:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSpinner()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSpinner()
      // api =
      $element.data('spinner')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('spinner:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asSpinner('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSpinner()
      api = $element.data('spinner')
    })

    test('should enable the plugin', () => {
      $element.asSpinner('disable')
      $element.asSpinner('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('spinner:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSpinner('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSpinner()
      api = $element.data('spinner')
    })

    test('should disable the plugin', () => {
      $element.asSpinner('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('spinner:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSpinner('disable')
      expect(called).toEqual(1)
    })
  })
})
