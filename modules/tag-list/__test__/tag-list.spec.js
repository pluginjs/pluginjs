import $ from 'jquery'
import List from '@pluginjs/list'
import TagList from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('TagList', () => {
  describe('TagList()', () => {
    test('should have TagList', () => {
      expect(TagList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(TagList.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(TagList.events).toBeObject()
    })
    test('should have classes', () => {
      expect(TagList.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(TagList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const tagList = new TagList(element)

      expect(tagList).toBeObject()
      expect(tagList.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const tagList = new TagList(element)

      expect(tagList.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asTagList()).toEqual($element)

      const api = $element.data('tagList')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asTagList()
      expect($element.asTagList('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asTagList()
      $element.asTagList('destroy')
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

      $element.on('tagList:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asTagList()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTagList()
      api = $element.data('tagList')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('tagList:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asTagList('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTagList()
      api = $element.data('tagList')
    })

    test('should enable the plugin', () => {
      $element.asTagList('disable')
      $element.asTagList('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('tagList:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asTagList('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTagList()
      api = $element.data('tagList')
    })

    test('should disable the plugin', () => {
      $element.asTagList('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('tagList:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asTagList('disable')
      expect(called).toEqual(1)
    })
  })
})
