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
    it('should have GalleryPicker', () => {
      expect(GalleryPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(GalleryPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(GalleryPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(GalleryPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(GalleryPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const galleryPicker = new GalleryPicker(element)

      expect(galleryPicker).to.be.an('object')
      expect(galleryPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const galleryPicker = new GalleryPicker(element)

      expect(galleryPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGalleryPicker()).to.be.equal($element)

      const api = $element.data('galleryPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asGalleryPicker()
      expect($element.asGalleryPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asGalleryPicker()
      $element.asGalleryPicker('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('galleryPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asGalleryPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGalleryPicker()
      api = $element.data('galleryPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('galleryPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asGalleryPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGalleryPicker()
      api = $element.data('galleryPicker')
    })

    it('should enable the plugin', () => {
      $element.asGalleryPicker('disable')
      $element.asGalleryPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('galleryPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asGalleryPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGalleryPicker()
      api = $element.data('galleryPicker')
    })

    it('should disable the plugin', () => {
      $element.asGalleryPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('galleryPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asGalleryPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
