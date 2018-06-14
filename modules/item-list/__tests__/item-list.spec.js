import $ from 'jquery'
import { deepMerge } from '@pluginjs/utils'
import List from '@pluginjs/list'
import ItemList from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

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
      const element = document.createElement('div')
      const itemList = new ItemList(element)

      expect(itemList).toBeObject()
      expect(itemList.options).toEqual(deepMerge(DEFAULTS, List.defaults))
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const itemList = new ItemList(element)

      expect(itemList.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asItemList()).toEqual($element)

      const api = $element.data('itemList')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asItemList()
      expect($element.asItemList('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asItemList()
      $element.asItemList('destroy')
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

      $element.on('itemList:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asItemList()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asItemList()
      // api =
      $element.data('itemList')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('itemList:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asItemList('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asItemList()
      api = $element.data('itemList')
    })

    test('should enable the plugin', () => {
      $element.asItemList('disable')
      $element.asItemList('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('itemList:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asItemList('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asItemList()
      api = $element.data('itemList')
    })

    test('should disable the plugin', () => {
      $element.asItemList('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('itemList:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asItemList('disable')
      expect(called).toEqual(1)
    })
  })
})
