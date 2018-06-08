import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Progress from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Progress', () => {
  describe('Progress()', () => {
    test('should have Progress', () => {
      expect(Progress).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Progress.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Progress.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Progress.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Progress.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const progress = new Progress(element)

      expect(progress).toBeObject()
      expect(progress.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const progress = new Progress(element)

      expect(progress.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asProgress()).toEqual($element)

      const api = $element.data('progress')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asProgress()
      expect($element.asProgress('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asProgress()
      expect($element.asProgress('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('progress:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asProgress()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asProgress()
      api = $element.data('progress')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('progress:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asProgress('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asProgress()
      api = $element.data('progress')
    })

    test('should enable the plugin', () => {
      $element.asProgress('disable')
      $element.asProgress('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('progress:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asProgress('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asProgress()
      api = $element.data('progress')
    })

    test('should disable the plugin', () => {
      $element.asProgress('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('progress:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asProgress('disable')
      expect(called).toEqual(1)
    })
  })
})
