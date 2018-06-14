import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Lightbox from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Lightbox', () => {
  describe('Lightbox()', () => {
    test('should have Lightbox', () => {
      expect(Lightbox).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Lightbox.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Lightbox.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Lightbox.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Lightbox.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const lightbox = new Lightbox(element)

      expect(lightbox).toBeObject()
      expect(lightbox.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const lightbox = new Lightbox(element)

      expect(lightbox.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asLightbox()).toEqual($element)

      const api = $element.data('lightbox')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asLightbox()
      expect($element.asLightbox('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asLightbox()
      $element.asLightbox('destroy')
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

      $element.on('lightbox:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asLightbox()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLightbox()
      api = $element.data('lightbox')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('lightbox:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asLightbox('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLightbox()
      api = $element.data('lightbox')
    })

    test('should enable the plugin', () => {
      $element.asLightbox('disable')
      $element.asLightbox('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('lightbox:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asLightbox('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLightbox()
      api = $element.data('lightbox')
    })

    test('should disable the plugin', () => {
      $element.asLightbox('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('lightbox:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asLightbox('disable')
      expect(called).toEqual(1)
    })
  })
})
