import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Lightbox from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Lightbox', () => {
  describe('Lightbox()', () => {
    it('should have Lightbox', () => {
      expect(Lightbox).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Lightbox.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Lightbox.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Lightbox.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Lightbox.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const lightbox = new Lightbox(element)

      expect(lightbox).to.be.an('object')
      expect(lightbox.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const lightbox = new Lightbox(element)

      expect(lightbox.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asLightbox()).to.be.equal($element)

      const api = $element.data('lightbox')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asLightbox()
      expect($element.asLightbox('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asLightbox()
      $element.asLightbox('destroy')
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

      $element.on('lightbox:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asLightbox()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLightbox()
      api = $element.data('lightbox')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('lightbox:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asLightbox('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLightbox()
      api = $element.data('lightbox')
    })

    it('should enable the plugin', () => {
      $element.asLightbox('disable')
      $element.asLightbox('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('lightbox:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asLightbox('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLightbox()
      api = $element.data('lightbox')
    })

    it('should disable the plugin', () => {
      $element.asLightbox('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('lightbox:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asLightbox('disable')
      expect(called).to.be.equal(1)
    })
  })
})
