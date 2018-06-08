import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/scrollable'
import '@pluginjs/tooltip'
import IconPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('IconPicker', () => {
  describe('IconPicker()', () => {
    it('should have IconPicker', () => {
      expect(IconPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(IconPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(IconPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(IconPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(IconPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const iconPicker = new IconPicker(element)

      expect(iconPicker).to.be.an('object')
      expect(iconPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const iconPicker = new IconPicker(element)

      expect(iconPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asIconPicker()).to.be.equal($element)

      const api = $element.data('iconPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asIconPicker()
      expect($element.asIconPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asIconPicker()
      $element.asIconPicker('destroy')
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

      $element.on('iconPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asIconPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asIconPicker()
      api = $element.data('iconPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('iconPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asIconPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asIconPicker()
      api = $element.data('iconPicker')
    })

    it('should enable the plugin', () => {
      $element.asIconPicker('disable')
      $element.asIconPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('iconPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asIconPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asIconPicker()
      api = $element.data('iconPicker')
    })

    it('should disable the plugin', () => {
      $element.asIconPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('iconPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asIconPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
