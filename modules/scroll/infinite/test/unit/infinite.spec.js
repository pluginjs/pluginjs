import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Infinite from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/scroll-end'

describe('Infinite', () => {
  describe('Infinite()', () => {
    it('should have Infinite', () => {
      expect(Infinite).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Infinite.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Infinite.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Infinite.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const infinite = new Infinite(element)

      expect(infinite).to.be.an('object')
      expect(infinite.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const infinite = new Infinite(element)
      console.log('debug', typeof infinite)

      expect(infinite.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asInfinite()).to.be.equal($element)

      const api = $element.data('infinite')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asInfinite()
      expect($element.asInfinite('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asInfinite()

      expect($element.asInfinite('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('infinite:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asInfinite()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInfinite()
      api = $element.data('infinite')
    })

    it('should trigger destroy event', () => {
      let called = 0
      $element.on('infinite:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asInfinite('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInfinite()
      api = $element.data('infinite')
    })

    it('should enable the plugin', () => {
      $element.asInfinite('disable')
      $element.asInfinite('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('infinite:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asInfinite('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInfinite()
      api = $element.data('infinite')
    })

    it('should disable the plugin', () => {
      $element.asInfinite('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('infinite:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asInfinite('disable')
      expect(called).to.be.equal(1)
    })
  })
})
