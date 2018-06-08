import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Filters from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Filters', () => {
  describe('Filters()', () => {
    it('should have Filters', () => {
      expect(Filters).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Filters.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Filters.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Filters.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Filters.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const filters = new Filters(element)

      expect(filters).to.be.an('object')
      expect(filters.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const filters = new Filters(element)

      expect(filters.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asFilters()).to.be.equal($element)

      const api = $element.data('filters')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asFilters()
      expect($element.asFilters('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asFilters()
      expect($element.asFilters('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('filters:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asFilters()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asFilters()
      api = $element.data('filters')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('filters:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asFilters('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asFilters()
      api = $element.data('filters')
    })

    it('should enable the plugin', () => {
      $element.asFilters('disable')
      $element.asFilters('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('filters:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asFilters('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asFilters()
      api = $element.data('filters')
    })

    it('should disable the plugin', () => {
      $element.asFilters('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('filters:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asFilters('disable')
      expect(called).to.be.equal(1)
    })
  })
})
