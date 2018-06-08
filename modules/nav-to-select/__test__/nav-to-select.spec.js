import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import NavToSelect from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('NavToSelect', () => {
  describe('NavToSelect()', () => {
    it('should have NavToSelect', () => {
      expect(NavToSelect).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(NavToSelect.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(NavToSelect.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(NavToSelect.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(NavToSelect.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const navToSelect = new NavToSelect(element)

      expect(navToSelect).to.be.an('object')
      expect(navToSelect.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const navToSelect = new NavToSelect(element)

      expect(navToSelect.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asNavToSelect()).to.be.equal($element)

      const api = $element.data('navToSelect')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asNavToSelect()
      expect($element.asNavToSelect('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asNavToSelect()
      expect($element.asNavToSelect('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('navToSelect:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asNavToSelect()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asNavToSelect()
      api = $element.data('navToSelect')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('navToSelect:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asNavToSelect('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asNavToSelect()
      api = $element.data('navToSelect')
    })

    it('should enable the plugin', () => {
      $element.asNavToSelect('disable')
      $element.asNavToSelect('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('navToSelect:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asNavToSelect('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asNavToSelect()
      api = $element.data('navToSelect')
    })

    it('should disable the plugin', () => {
      $element.asNavToSelect('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('navToSelect:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asNavToSelect('disable')
      expect(called).to.be.equal(1)
    })
  })
})
