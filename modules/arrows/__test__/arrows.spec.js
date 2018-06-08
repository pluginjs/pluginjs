// import jsdom from 'mocha-jsdom';
import $ from 'jquery'
import Arrows from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Arrows', () => {
  describe('Arrows()', () => {
    test('should have Arrows', () => {
      expect(Arrows).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Arrows.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Arrows.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Arrows.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Arrows.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const arrows = new Arrows(element)

      expect(arrows).toBeObject()
      expect(arrows.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const arrows = new Arrows(element)

      expect(arrows.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asArrows()).toEqual($element)

      const api = $element.data('arrows')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asArrows()
      expect($element.asArrows('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asArrows()
      expect($element.asArrows('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('arrows:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asArrows()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asArrows()
      api = $element.data('arrows')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('arrows:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asArrows('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asArrows()
      api = $element.data('arrows')
    })

    test('should enable the plugin', () => {
      $element.asArrows('disable')
      $element.asArrows('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('arrows:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asArrows('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asArrows()
      api = $element.data('arrows')
    })

    test('should disable the plugin', () => {
      $element.asArrows('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('arrows:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asArrows('disable')
      expect(called).toEqual(1)
    })
  })
})
