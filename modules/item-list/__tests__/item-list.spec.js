import { deepMerge } from '@pluginjs/utils'
import List from '@pluginjs/list'
import ItemList from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ItemList', () => {
  describe('ItemList()', () => {
    test('should have ItemList', () => {
      expect(ItemList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ItemList.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ItemList.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ItemList.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ItemList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const itemList = ItemList.of(generateHTMLSample())

      expect(itemList).toBeObject()
      expect(itemList.options).toEqual(deepMerge(DEFAULTS, List.defaults))
    })

    test('should have options', () => {
      const itemList = ItemList.of(generateHTMLSample())

      expect(itemList.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = ItemList.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ItemList.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ItemList.of(generateHTMLSample())
      $element.destroy()
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

      $element.addEventListener('itemList:ready', () => {
        called++
      })

      const api = ItemList.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('itemList:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('itemList:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('itemList:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
