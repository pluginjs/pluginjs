import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import SvgProgress from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('SvgProgress', () => {
  describe('SvgProgress()', () => {
    it('should have SvgProgress', () => {
      expect(SvgProgress).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(SvgProgress.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(SvgProgress.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(SvgProgress.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(SvgProgress.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const svgProgress = new SvgProgress(element)

      expect(svgProgress).to.be.an('object')
    })

    it('should have options', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const svgProgress = new SvgProgress(element)

      expect(svgProgress.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const $element = $(element)

      expect($element.asSvgProgress()).to.be.equal($element)

      const api = $element.data('svgProgress')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should call destroy', () => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      const $element = $(element).asSvgProgress()
      expect($element.asSvgProgress('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element)
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('svgProgress:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSvgProgress()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element).asSvgProgress()
      api = $element.data('svgProgress')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('svgProgress:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSvgProgress('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element).asSvgProgress()
      api = $element.data('svgProgress')
    })

    it('should enable the plugin', () => {
      $element.asSvgProgress('disable')
      $element.asSvgProgress('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('svgProgress:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSvgProgress('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.setAttribute('data-shape', 'circle')
      $element = $(element).asSvgProgress()
      api = $element.data('svgProgress')
    })

    it('should disable the plugin', () => {
      $element.asSvgProgress('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('svgProgress:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSvgProgress('disable')
      expect(called).to.be.equal(1)
    })
  })
})
