import $ from 'jquery'
import '@pluginjs/video'
import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import VideoPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('VideoPicker', () => {
  describe('VideoPicker()', () => {
    it('should have VideoPicker', () => {
      expect(VideoPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(VideoPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(VideoPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(VideoPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(VideoPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('input')
      const videoPicker = new VideoPicker(element)

      expect(videoPicker).to.be.an('object')
      expect(videoPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('input')
      const videoPicker = new VideoPicker(element)

      expect(videoPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('input')
      const $element = $(element)

      expect($element.asVideoPicker()).to.be.equal($element)

      const api = $element.data('videoPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('input')).asVideoPicker()
      expect($element.asVideoPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('input')).asVideoPicker()
      $element.asVideoPicker('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('input'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('videoPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asVideoPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asVideoPicker()
      api = $element.data('videoPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('videoPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asVideoPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asVideoPicker()
      api = $element.data('videoPicker')
    })

    it('should enable the plugin', () => {
      $element.asVideoPicker('disable')
      $element.asVideoPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('videoPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asVideoPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asVideoPicker()
      api = $element.data('videoPicker')
    })

    it('should disable the plugin', () => {
      $element.asVideoPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('videoPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asVideoPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
