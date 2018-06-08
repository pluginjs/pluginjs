import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Filters from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Filters', () => {
  describe('Filters()', () => {
    test('should have Filters', () => {
      expect(Filters).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Filters.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Filters.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Filters.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Filters.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const filters = new Filters(element)

      expect(filters).toBeObject()
      expect(filters.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const filters = new Filters(element)

      expect(filters.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asFilters()).toEqual($element)

      const api = $element.data('filters')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asFilters()
      expect($element.asFilters('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asFilters()
      expect($element.asFilters('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('filters:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asFilters()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asFilters()
      api = $element.data('filters')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('filters:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asFilters('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asFilters()
      api = $element.data('filters')
    })

    test('should enable the plugin', () => {
      $element.asFilters('disable')
      $element.asFilters('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('filters:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asFilters('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asFilters()
      api = $element.data('filters')
    })

    test('should disable the plugin', () => {
      $element.asFilters('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('filters:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asFilters('disable')
      expect(called).toEqual(1)
    })
  })
})
