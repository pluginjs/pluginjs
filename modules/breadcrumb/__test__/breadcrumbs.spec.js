import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Breadcrumb from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Breadcrumb', () => {
  describe('Breadcrumb()', () => {
    it('should have Breadcrumb', () => {
      expect(Breadcrumb).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Breadcrumb.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Breadcrumb.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Breadcrumb.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Breadcrumb.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const breadcrumb = new Breadcrumb(element)

      expect(breadcrumb).to.be.an('object')
      expect(breadcrumb.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const breadcrumb = new Breadcrumb(element)

      expect(breadcrumb.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asBreadcrumb()).to.be.equal($element)

      const api = $element.data('breadcrumb')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asBreadcrumb()
      expect($element.asBreadcrumb('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asBreadcrumb()
      expect($element.asBreadcrumb('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('breadcrumb:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asBreadcrumb()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBreadcrumb()
      api = $element.data('breadcrumb')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('breadcrumb:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asBreadcrumb('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBreadcrumb()
      api = $element.data('breadcrumb')
    })

    it('should enable the plugin', () => {
      $element.asBreadcrumb('disable')
      $element.asBreadcrumb('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('breadcrumb:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asBreadcrumb('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBreadcrumb()
      api = $element.data('breadcrumb')
    })

    it('should disable the plugin', () => {
      $element.asBreadcrumb('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('breadcrumb:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asBreadcrumb('disable')
      expect(called).to.be.equal(1)
    })
  })
})
