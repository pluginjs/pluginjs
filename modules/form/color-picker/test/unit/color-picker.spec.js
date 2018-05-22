import $ from 'jquery'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import ColorPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ColorPicker', () => {
  describe('ColorPicker()', () => {
    it('should have ColorPicker', () => {
      expect(ColorPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ColorPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(ColorPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(ColorPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(ColorPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const colorPicker = new ColorPicker(element)

      expect(colorPicker).to.be.an('object')
      expect(colorPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const colorPicker = new ColorPicker(element)

      expect(colorPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asColorPicker()).to.be.equal($element)

      const api = $element.data('colorPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asColorPicker()
      expect($element.asColorPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asColorPicker()
      $element.asColorPicker('destroy')
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

      $element.on('colorPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asColorPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asColorPicker()
      api = $element.data('colorPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('colorPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asColorPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asColorPicker()
      api = $element.data('colorPicker')
    })

    it('should enable the plugin', () => {
      $element.asColorPicker('disable')
      $element.asColorPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('colorPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asColorPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asColorPicker()
      api = $element.data('colorPicker')
    })

    it('should disable the plugin', () => {
      $element.asColorPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('colorPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asColorPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
