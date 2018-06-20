import List from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('List', () => {
  describe('List()', () => {
    test('should have List', () => {
      expect(List).toBeFunction()
    })

    test('should have defaults', () => {
      expect(List.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(List.events).toBeObject()
    })
    test('should have classes', () => {
      expect(List.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(List.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const list = List.of(generateHTMLSample())

      expect(list).toBeObject()
      expect(list.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const list = List.of(generateHTMLSample())

      expect(list.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()

      expect($element.asList()).toEqual($element)

      const api = $element.data('list')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = generateHTMLSample().asList()
      expect($element.asList('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = generateHTMLSample().asList()
      $element.asList('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('list:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asList()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = generateHTMLSample().asList()
      // api =
      $element.data('list')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('list:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asList('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asList()
      api = $element.data('list')
    })

    test('should enable the plugin', () => {
      $element.asList('disable')
      $element.asList('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('list:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asList('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asList()
      api = $element.data('list')
    })

    test('should disable the plugin', () => {
      $element.asList('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('list:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asList('disable')
      expect(called).toEqual(1)
    })
  })
})
