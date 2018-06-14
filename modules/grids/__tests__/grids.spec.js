import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Grids from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Grids', () => {
  describe('Grids()', () => {
    test('should have Grids', () => {
      expect(Grids).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Grids.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Grids.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Grids.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Grids.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const grids = new Grids(element)

      expect(grids).toBeObject()
      expect(grids.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const grids = new Grids(element)

      expect(grids.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGrids()).toEqual($element)

      const api = $element.data('grids')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asGrids()
      expect($element.asGrids('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asGrids()
      $element.asGrids('destroy')
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

      $element.on('grids:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asGrids()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGrids()
      api = $element.data('grids')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('grids:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asGrids('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGrids()
      api = $element.data('grids')
    })

    test('should enable the plugin', () => {
      $element.asGrids('disable')
      $element.asGrids('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('grids:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asGrids('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGrids()
      api = $element.data('grids')
    })

    test('should disable the plugin', () => {
      $element.asGrids('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('grids:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asGrids('disable')
      expect(called).toEqual(1)
    })
  })
})
