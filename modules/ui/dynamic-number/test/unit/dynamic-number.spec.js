import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import DynamicNumber from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('dynamicNumber', () => {
  describe('dynamicNumber()', () => {
    it('should have dynamicNumber', () => {
      expect(DynamicNumber).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(DynamicNumber.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(DynamicNumber.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(DynamicNumber.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      $(element).attr({
        'data-from': '0',
        'data-to': '30'
      })

      const dynamicNumber = new DynamicNumber(element)

      expect(dynamicNumber).to.be.an('object')
      expect(dynamicNumber.options).to.be.an('object')
      expect(dynamicNumber.options.from).to.be.an('number')
      expect(dynamicNumber.options.from).to.be.equal(0)
      expect(dynamicNumber.options.to).to.be.equal(30)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const dynamicNumber = new DynamicNumber(element, {
        from: 0,
        to: 30
      })

      expect(dynamicNumber.options).to.be.an('object')
      expect(dynamicNumber.options.from).to.be.an('number')
      expect(dynamicNumber.options.from).to.be.equal(0)
      expect(dynamicNumber.options.to).to.be.equal(30)
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asDynamicNumber()).to.be.equal($element)

      const api = $element.data('dynamicNumber')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should call start', () => {
      const $element = $(document.createElement('div'))
      expect($element.is('start')).to.be.false
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asDynamicNumber()
      expect($element.asDynamicNumber('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('dynamicNumber:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asDynamicNumber()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDynamicNumber()
      api = $element.data('asDynamicNumber')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('dynamicNumber:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asDynamicNumber('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('start()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDynamicNumber()
      api = $element.data('asDynamicNumber')
    })

    it('should trigger start event', () => {
      let called = 0

      $element.on('dynamicNumber:start', (event, api) => {
        expect(api.is('start')).to.be.true
        called++
      })

      $element.asDynamicNumber('start')

      expect(called).to.be.equal(1)
    })
  })
})
