import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import ScrollProgress from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ScrollProgress', () => {
  describe('ScrollProgress()', () => {
    it('should have ScrollProgress', () => {
      expect(ScrollProgress).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ScrollProgress.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(ScrollProgress.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(ScrollProgress.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const scrollProgress = new ScrollProgress(element)

      expect(scrollProgress).to.be.an('object')
      expect(scrollProgress.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const scrollProgress = new ScrollProgress(element)

      expect(scrollProgress.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollProgress()).to.be.equal($element)

      const api = $element.data('scrollProgress')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollProgress()
      expect($element.asScrollProgress('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollProgress()
      expect($element.asScrollProgress('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('scrollProgress:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asScrollProgress()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollProgress()
      api = $element.data('scrollProgress')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollProgress:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asScrollProgress('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollProgress()
      api = $element.data('scrollProgress')
    })

    it('should enable the plugin', () => {
      $element.asScrollProgress('disable')
      $element.asScrollProgress('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('scrollProgress:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asScrollProgress('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollProgress()
      api = $element.data('scrollProgress')
    })

    it('should disable the plugin', () => {
      $element.asScrollProgress('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('scrollProgress:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asScrollProgress('disable')
      expect(called).to.be.equal(1)
    })
  })
})
