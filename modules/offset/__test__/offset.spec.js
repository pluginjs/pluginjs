import $ from 'jquery'
import '@pluginjs/tooltip'
import '@pluginjs/dropdown'
import '@pluginjs/units'
import Offset from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Offset', () => {
  describe('Offset()', () => {
    it('should have Offset', () => {
      expect(Offset).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Offset.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Offset.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Offset.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Offset.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const offset = new Offset(element)

      expect(offset).to.be.an('object')
      expect(offset.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const offset = new Offset(element)

      expect(offset.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asOffset()).to.be.equal($element)

      const api = $element.data('offset')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asOffset()
      expect($element.asOffset('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asOffset()
      expect($element.asOffset('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('offset:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asOffset()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asOffset()
      api = $element.data('offset')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('offset:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asOffset('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asOffset()
      api = $element.data('offset')
    })

    it('should enable the plugin', () => {
      $element.asOffset('disable')
      $element.asOffset('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('offset:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asOffset('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asOffset()
      api = $element.data('offset')
    })

    it('should disable the plugin', () => {
      $element.asOffset('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('offset:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asOffset('disable')
      expect(called).to.be.equal(1)
    })
  })
})
