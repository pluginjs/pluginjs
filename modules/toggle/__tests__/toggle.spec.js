import $ from 'jquery'
import Toggle from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Toggle', () => {
  describe('Toggle()', () => {
    test('should have Toggle', () => {
      expect(Toggle).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Toggle.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Toggle.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Toggle.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Toggle.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const _toggle = new Toggle(element)

      expect(_toggle).toBeObject()
      expect(_toggle.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const _toggle = new Toggle(element)

      expect(_toggle.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asToggle()).toEqual($element)

      const api = $element.data('toggle')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asToggle()
      expect($element.asToggle('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asToggle()
      expect($element.asToggle('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('toggle:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asToggle()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggle()
      // api =
      $element.data('toggle')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('toggle:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asToggle('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggle()
      api = $element.data('toggle')
    })

    test('should enable the plugin', () => {
      $element.asToggle('disable')
      $element.asToggle('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('toggle:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asToggle('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggle()
      api = $element.data('toggle')
    })

    test('should disable the plugin', () => {
      $element.asToggle('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('toggle:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asToggle('disable')
      expect(called).toEqual(1)
    })
  })
})
