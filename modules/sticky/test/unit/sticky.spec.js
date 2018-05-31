import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Sticky from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Sticky', () => {
  describe('Sticky()', () => {
    it('should have Sticky', () => {
      expect(Sticky).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Sticky.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Sticky.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Sticky.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Sticky.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const sticky = new Sticky(element)

      expect(sticky).to.be.an('object')
      expect(sticky.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const sticky = new Sticky(element)

      expect(sticky.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSticky()).to.be.equal($element)

      const api = $element.data('sticky')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asSticky()
      expect($element.asSticky('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asSticky()
      $element.asSticky('destroy')
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

      $element.on('sticky:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSticky()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSticky()
      api = $element.data('sticky')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('sticky:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSticky('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSticky()
      api = $element.data('sticky')
    })

    it('should enable the plugin', () => {
      $element.asSticky('disable')
      $element.asSticky('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('sticky:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSticky('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSticky()
      api = $element.data('sticky')
    })

    it('should disable the plugin', () => {
      $element.asSticky('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('sticky:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSticky('disable')
      expect(called).to.be.equal(1)
    })
  })
})
