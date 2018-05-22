import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Headroom from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Headroom', () => {
  describe('Headroom()', () => {
    it('should have Headroom', () => {
      expect(Headroom).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Headroom.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Headroom.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Headroom.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const headroom = new Headroom(element)

      expect(headroom).to.be.an('object')
      expect(headroom.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const headroom = new Headroom(element)

      expect(headroom.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asHeadroom()).to.be.equal($element)

      const api = $element.data('headroom')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asHeadroom()
      expect($element.asHeadroom('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asHeadroom({
        type: 'stick'
      })

      expect($element.asHeadroom('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('headroom:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asHeadroom()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHeadroom({ type: 'stick' })
      api = $element.data('headroom')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('headroom:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asHeadroom('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHeadroom()
      api = $element.data('headroom')
    })

    it('should enable the plugin', () => {
      $element.asHeadroom('disable')
      $element.asHeadroom('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('headroom:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asHeadroom('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHeadroom()
      api = $element.data('headroom')
    })

    it('should disable the plugin', () => {
      $element.asHeadroom('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('headroom:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asHeadroom('disable')
      expect(called).to.be.equal(1)
    })
  })
})
