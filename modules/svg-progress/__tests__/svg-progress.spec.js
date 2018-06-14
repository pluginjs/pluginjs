import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import SvgProgress from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('SvgProgress', () => {
  describe('SvgProgress()', () => {
    test('should have SvgProgress', () => {
      expect(SvgProgress).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SvgProgress.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(SvgProgress.events).toBeObject()
    })

    test('should have classes', () => {
      expect(SvgProgress.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(SvgProgress.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const svgProgress = new SvgProgress(element)

      expect(svgProgress).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const svgProgress = new SvgProgress(element)

      expect(svgProgress.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const $element = $(element)

      expect($element.asSvgProgress()).toEqual($element)

      const api = $element.data('svgProgress')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should call destroy', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const $element = $(element).asSvgProgress()
      expect($element.asSvgProgress('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('svgProgress:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSvgProgress()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element).asSvgProgress()
      api = $element.data('svgProgress')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('svgProgress:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asSvgProgress('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element).asSvgProgress()
      api = $element.data('svgProgress')
    })

    test('should enable the plugin', () => {
      $element.asSvgProgress('disable')
      $element.asSvgProgress('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('svgProgress:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSvgProgress('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element).asSvgProgress()
      api = $element.data('svgProgress')
    })

    test('should disable the plugin', () => {
      $element.asSvgProgress('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('svgProgress:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSvgProgress('disable')
      expect(called).toEqual(1)
    })
  })
})
