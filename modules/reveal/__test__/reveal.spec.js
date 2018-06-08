import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Reveal from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Reveal', () => {
  describe('Reveal()', () => {
    it('should have Reveal', () => {
      expect(Reveal).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Reveal.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Reveal.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Reveal.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const reveal = new Reveal(element)

      expect(reveal).to.be.an('object')
      expect(reveal.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const reveal = new Reveal(element)

      expect(reveal.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asReveal()).to.be.equal($element)

      const api = $element.data('reveal')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asReveal()
      expect($element.asReveal('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asReveal()
      expect($element.asReveal('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('reveal:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asReveal()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asReveal()
      api = $element.data('reveal')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('reveal:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asReveal('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asReveal()
      api = $element.data('reveal')
    })

    it('should enable the plugin', () => {
      $element.asReveal('disable')
      $element.asReveal('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('reveal:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asReveal('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asReveal()
      api = $element.data('reveal')
    })

    it('should disable the plugin', () => {
      $element.asReveal('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('reveal:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asReveal('disable')
      expect(called).to.be.equal(1)
    })
  })
})
