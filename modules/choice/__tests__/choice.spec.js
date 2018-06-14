// import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Choice from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Choice', () => {
  describe('Choice()', () => {
    test('should have Choice', () => {
      expect(Choice).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Choice.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Choice.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Choice.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Choice.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const choice = new Choice(element)

      expect(choice).toBeObject()
      expect(choice.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const choice = new Choice(element)

      expect(choice.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asChoice()).toEqual($element)

      const api = $element.data('choice')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asChoice()
      expect($element.asChoice('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asChoice()
      $element.asChoice('destroy')
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

      $element.on('choice:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asChoice()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asChoice()
      // api =
      $element.data('choice')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('choice:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asChoice('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asChoice()
      api = $element.data('choice')
    })

    test('should enable the plugin', () => {
      $element.asChoice('disable')
      $element.asChoice('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('choice:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asChoice('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asChoice()
      api = $element.data('choice')
    })

    test('should disable the plugin', () => {
      $element.asChoice('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('choice:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asChoice('disable')
      expect(called).toEqual(1)
    })
  })
})
