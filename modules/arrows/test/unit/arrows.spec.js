// import jsdom from 'mocha-jsdom';
import $ from 'jquery'
import Arrows from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Arrows', () => {
  describe('Arrows()', () => {
    it('should have Arrows', () => {
      expect(Arrows).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Arrows.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Arrows.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Arrows.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Arrows.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const arrows = new Arrows(element)

      expect(arrows).to.be.an('object')
      expect(arrows.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const arrows = new Arrows(element)

      expect(arrows.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asArrows()).to.be.equal($element)

      const api = $element.data('arrows')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asArrows()
      expect($element.asArrows('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asArrows()
      expect($element.asArrows('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('arrows:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asArrows()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asArrows()
      api = $element.data('arrows')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('arrows:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asArrows('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asArrows()
      api = $element.data('arrows')
    })

    it('should enable the plugin', () => {
      $element.asArrows('disable')
      $element.asArrows('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('arrows:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asArrows('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asArrows()
      api = $element.data('arrows')
    })

    it('should disable the plugin', () => {
      $element.asArrows('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('arrows:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asArrows('disable')
      expect(called).to.be.equal(1)
    })
  })
})
