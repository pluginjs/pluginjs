import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import GalleryPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('GalleryPicker', () => {
  describe('GalleryPicker()', () => {
    test('should have GalleryPicker', () => {
      expect(GalleryPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GalleryPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(GalleryPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(GalleryPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(GalleryPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const galleryPicker = new GalleryPicker(element)

      expect(galleryPicker).toBeObject()
      expect(galleryPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const galleryPicker = new GalleryPicker(element)

      expect(galleryPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGalleryPicker()).toEqual($element)

      const api = $element.data('galleryPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asGalleryPicker()
      expect($element.asGalleryPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asGalleryPicker()
      $element.asGalleryPicker('destroy')
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

      $element.on('galleryPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asGalleryPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGalleryPicker()
      api = $element.data('galleryPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('galleryPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asGalleryPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGalleryPicker()
      api = $element.data('galleryPicker')
    })

    test('should enable the plugin', () => {
      $element.asGalleryPicker('disable')
      $element.asGalleryPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('galleryPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asGalleryPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGalleryPicker()
      api = $element.data('galleryPicker')
    })

    test('should disable the plugin', () => {
      $element.asGalleryPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('galleryPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asGalleryPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
