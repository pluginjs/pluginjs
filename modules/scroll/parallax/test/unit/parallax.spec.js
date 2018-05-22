import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Parallax from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Parallax', () => {
  describe('Parallax()', () => {
    it('should have Parallax', () => {
      expect(Parallax).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Parallax.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Parallax.events).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Parallax.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const parallax = new Parallax(element)

      expect(parallax).to.be.an('object')
      expect(parallax.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const parallax = new Parallax(element)

      expect(parallax.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asParallax()).to.be.equal($element)

      const api = $element.data('parallax')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asParallax()
      expect($element.asParallax('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asParallax()
      $element.asParallax('destroy')
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

      $element.on('parallax:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asParallax()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asParallax()
      api = $element.data('parallax')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('parallax:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asParallax('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asParallax()
      api = $element.data('parallax')
    })

    it('should enable the plugin', () => {
      $element.asParallax('disable')
      $element.asParallax('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('parallax:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asParallax('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asParallax()
      api = $element.data('parallax')
    })

    it('should disable the plugin', () => {
      $element.asParallax('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('parallax:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asParallax('disable')
      expect(called).to.be.equal(1)
    })
  })
})
