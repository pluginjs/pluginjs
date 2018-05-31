import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/scrollable'
import SvgPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('SvgPicker', () => {
  describe('SvgPicker()', () => {
    it('should have SvgPicker', () => {
      expect(SvgPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(SvgPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(SvgPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(SvgPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(SvgPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const svgPicker = new SvgPicker(element)

      expect(svgPicker).to.be.an('object')
      expect(svgPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const svgPicker = new SvgPicker(element)

      expect(svgPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSvgPicker()).to.be.equal($element)

      const api = $element.data('svgPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asSvgPicker()
      expect($element.asSvgPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asSvgPicker()
      $element.asSvgPicker('destroy')
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

      $element.on('svgPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSvgPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSvgPicker()
      api = $element.data('svgPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('svgPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSvgPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSvgPicker()
      api = $element.data('svgPicker')
    })

    it('should enable the plugin', () => {
      $element.asSvgPicker('disable')
      $element.asSvgPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('svgPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSvgPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSvgPicker()
      api = $element.data('svgPicker')
    })

    it('should disable the plugin', () => {
      $element.asSvgPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('svgPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSvgPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
