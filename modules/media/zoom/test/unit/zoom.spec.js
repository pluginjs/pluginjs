import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Zoom from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Zoom', () => {
  describe('Zoom()', () => {
    it('should have Zoom', () => {
      expect(Zoom).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Zoom.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Zoom.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Zoom.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Zoom.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const zoom = new Zoom(element)

      expect(zoom).to.be.an('object')
      expect(zoom.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const zoom = new Zoom(element)

      expect(zoom.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asZoom()).to.be.equal($element)

      const api = $element.data('zoom')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asZoom()
      expect($element.asZoom('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asZoom()
      $element.asZoom('destroy')
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

      $element.on('zoom:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asZoom()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asZoom()
      api = $element.data('zoom')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('zoom:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asZoom('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asZoom()
      api = $element.data('zoom')
    })

    it('should enable the plugin', () => {
      $element.asZoom('disable')
      $element.asZoom('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('zoom:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asZoom('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asZoom()
      api = $element.data('zoom')
    })

    it('should disable the plugin', () => {
      $element.asZoom('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('zoom:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asZoom('disable')
      expect(called).to.be.equal(1)
    })
  })
})
