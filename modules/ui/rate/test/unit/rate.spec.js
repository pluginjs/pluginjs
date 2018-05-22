import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Rate from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Rate', () => {
  describe('Rate()', () => {
    it('should have Rate', () => {
      expect(Rate).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Rate.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Rate.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Rate.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Rate.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const rate = new Rate(element)

      expect(rate).to.be.an('object')
      expect(rate.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const rate = new Rate(element)

      expect(rate.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asRate()).to.be.equal($element)

      const api = $element.data('rate')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asRate()
      expect($element.asRate('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asRate()
      expect($element.asRate('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('rate:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asRate()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRate()
      api = $element.data('rate')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('rate:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asRate('destroy')

      expect(called).to.be.equal(1)
    })
  })
})
