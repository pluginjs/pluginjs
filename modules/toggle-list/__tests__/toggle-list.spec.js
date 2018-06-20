import $ from 'jquery'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
// import List from '@pluginjs/list'
import '@pluginjs/toggle'
// import { deepMerge } from '@pluginjs/utils'
import ToggleList from '../src/main'
// import { defaults as DEFAULTS } from '../../src/constant'

const data = [
  {
    title: 'Interfaces',
    checked: true
  },
  {
    title: 'UI Design',
    checked: false
  },
  {
    title: 'Web Design',
    checked: false
  },
  {
    title: 'Typography',
    checked: true
  },
  {
    title: 'Landing',
    checked: false
  }
]
describe('ToggleList', () => {
  describe('ToggleList()', () => {
    test('should have ToggleList', () => {
      expect(ToggleList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ToggleList.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ToggleList.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ToggleList.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ToggleList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const toggleList = new ToggleList(element, { data })
      expect(toggleList).toBeObject()
      // expect(others).toEqual(deepMerge(List.defaults, DEFAULTS));
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const toggleList = new ToggleList(element, { data })

      expect(toggleList.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asToggleList({ data })).toEqual($element)

      const api = $element.data('toggleList')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asToggleList({ data })
      expect($element.asToggleList('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asToggleList({ data })
      $element.asToggleList('destroy')
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

      $element.on('toggleList:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asToggleList({ data })
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggleList({ data })
      // api =
      $element.data('toggleList')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('toggleList:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asToggleList('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggleList({ data })
      api = $element.data('toggleList')
    })

    test('should enable the plugin', () => {
      $element.asToggleList('disable')
      $element.asToggleList('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('toggleList:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asToggleList('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggleList({ data })
      api = $element.data('toggleList')
    })

    test('should disable the plugin', () => {
      $element.asToggleList('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('toggleList:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asToggleList('disable')
      expect(called).toEqual(1)
    })
  })
})
