import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/units'
import Range from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Range', () => {
  describe('Range()', () => {
    it('should have Range', () => {
      expect(Range).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Range.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Range.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Range.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Range.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const range = new Range(element)

      expect(range).to.be.an('object')
      expect(range.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const range = new Range(element)

      expect(range.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asRange()).to.be.equal($element)

      const api = $element.data('range')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asRange()
      expect($element.asRange('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asRange()
      $element.asRange('destroy')
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

      $element.on('range:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asRange()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRange()
      api = $element.data('range')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('range:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asRange('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRange()
      api = $element.data('range')
    })

    it('should enable the plugin', () => {
      $element.asRange('disable')
      $element.asRange('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('range:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asRange('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRange()
      api = $element.data('range')
    })

    it('should disable the plugin', () => {
      $element.asRange('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('range:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asRange('disable')
      expect(called).to.be.equal(1)
    })
  })
})
