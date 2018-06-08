import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Grids from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Grids', () => {
  describe('Grids()', () => {
    it('should have Grids', () => {
      expect(Grids).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Grids.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Grids.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Grids.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Grids.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const grids = new Grids(element)

      expect(grids).to.be.an('object')
      expect(grids.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const grids = new Grids(element)

      expect(grids.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGrids()).to.be.equal($element)

      const api = $element.data('grids')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asGrids()
      expect($element.asGrids('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asGrids()
      $element.asGrids('destroy')
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

      $element.on('grids:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asGrids()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGrids()
      api = $element.data('grids')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('grids:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asGrids('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGrids()
      api = $element.data('grids')
    })

    it('should enable the plugin', () => {
      $element.asGrids('disable')
      $element.asGrids('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('grids:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asGrids('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGrids()
      api = $element.data('grids')
    })

    it('should disable the plugin', () => {
      $element.asGrids('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('grids:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asGrids('disable')
      expect(called).to.be.equal(1)
    })
  })
})
