import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import ScrollTo from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ScrollTo', () => {
  describe('ScrollTo()', () => {
    it('should have ScrollTo', () => {
      expect(ScrollTo).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ScrollTo.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(ScrollTo.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(ScrollTo.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(ScrollTo.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const scrollTo = new ScrollTo(element)

      expect(scrollTo).to.be.an('object')
      expect(scrollTo.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const scrollTo = new ScrollTo(element)

      expect(scrollTo.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asScrollTo()).to.be.equal($element)

      const api = $element.data('scrollTo')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asScrollTo()
      expect($element.asScrollTo('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asScrollTo()
      expect($element.asScrollTo('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('scrollTo:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asScrollTo()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTo()
      api = $element.data('scrollTo')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('scrollTo:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asScrollTo('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTo()
      api = $element.data('scrollTo')
    })

    it('should enable the plugin', () => {
      $element.asScrollTo('disable')
      $element.asScrollTo('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('scrollTo:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asScrollTo('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asScrollTo()
      api = $element.data('scrollTo')
    })

    it('should disable the plugin', () => {
      $element.asScrollTo('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('scrollTo:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asScrollTo('disable')
      expect(called).to.be.equal(1)
    })
  })
})
