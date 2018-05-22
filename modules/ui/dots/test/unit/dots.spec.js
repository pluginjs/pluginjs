import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Dots from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Dots', () => {
  describe('Dots()', () => {
    it('should have Dots', () => {
      expect(Dots).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Dots.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Dots.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Dots.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Dots.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const dots = new Dots(element)

      expect(dots).to.be.an('object')
      expect(dots.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const dots = new Dots(element)

      expect(dots.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asDots()).to.be.equal($element)

      const api = $element.data('dots')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asDots()
      expect($element.asDots('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asDots()
      expect($element.asDots('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('dots:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asDots()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDots()
      api = $element.data('dots')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('dots:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asDots('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDots()
      api = $element.data('dots')
    })

    it('should enable the plugin', () => {
      $element.asDots('disable')
      $element.asDots('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('dots:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asDots('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDots()
      api = $element.data('dots')
    })

    it('should disable the plugin', () => {
      $element.asDots('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('dots:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asDots('disable')
      expect(called).to.be.equal(1)
    })
  })
})
