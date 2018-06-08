import $ from 'jquery'
import '@pluginjs/gmap'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import MapPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('MapPicker', () => {
  describe('MapPicker()', () => {
    it('should have MapPicker', () => {
      expect(MapPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(MapPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(MapPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(MapPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(MapPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const mapPicker = new MapPicker(element)

      expect(mapPicker).to.be.an('object')
      expect(mapPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const mapPicker = new MapPicker(element)

      expect(mapPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asMapPicker()).to.be.equal($element)

      const api = $element.data('mapPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asMapPicker()
      expect($element.asMapPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asMapPicker()
      $element.asMapPicker('destroy')
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

      $element.on('mapPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asMapPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asMapPicker()
      api = $element.data('mapPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('mapPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asMapPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asMapPicker()
      api = $element.data('mapPicker')
    })

    it('should enable the plugin', () => {
      $element.asMapPicker('disable')
      $element.asMapPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('mapPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asMapPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asMapPicker()
      api = $element.data('mapPicker')
    })

    it('should disable the plugin', () => {
      $element.asMapPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('mapPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asMapPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
