import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Gmap from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Gmap', () => {
  describe('Gmap()', () => {
    it('should have Gmap', () => {
      expect(Gmap).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Gmap.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Gmap.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Gmap.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Gmap.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const gmap = new Gmap(element)

      expect(gmap).to.be.an('object')
      expect(gmap.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const gmap = new Gmap(element)

      expect(gmap.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGmap()).to.be.equal($element)

      const api = $element.data('gmap')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asGmap()
      expect($element.asGmap('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asGmap()
      expect($element.asGmap('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('gmap:ready', (event, api) => {
        // expect(api.is('initialized')).to.be.true;
        called++
        expect(called).to.be.equal(1)
      })

      $element.asGmap()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGmap()
      api = $element.data('gmap')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('gmap:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asGmap('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGmap()
      api = $element.data('gmap')
    })

    it('should enable the plugin', () => {
      $element.asGmap('disable')
      $element.asGmap('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('gmap:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asGmap('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGmap()
      api = $element.data('gmap')
    })

    it('should disable the plugin', () => {
      $element.asGmap('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('gmap:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asGmap('disable')
      expect(called).to.be.equal(1)
    })
  })
})
