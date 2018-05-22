import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Scrollbar from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Scrollbar', () => {
  describe('Scrollbar()', () => {
    it('should have Scrollbar', () => {
      expect(Scrollbar).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Scrollbar.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Scrollbar.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Scrollbar.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Scrollbar.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const scrollbar = new Scrollbar(element)

      expect(scrollbar).to.be.an('object')
      expect(scrollbar.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const scrollbar = new Scrollbar(element)

      expect(scrollbar.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollbar()).to.be.equal($element)

      const api = $element.data('scrollbar')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollbar()
      expect($element.asScrollbar('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollbar()
      expect($element.asScrollbar('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('scrollbar:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asScrollbar()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollbar()
      api = $element.data('scrollbar')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollbar:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asScrollbar('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollbar()
      api = $element.data('scrollbar')
    })

    it('should enable the plugin', () => {
      $element.asScrollbar('disable')
      $element.asScrollbar('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('scrollbar:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asScrollbar('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollbar()
      api = $element.data('scrollbar')
    })

    it('should disable the plugin', () => {
      $element.asScrollbar('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('scrollbar:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asScrollbar('disable')
      expect(called).to.be.equal(1)
    })
  })
})
