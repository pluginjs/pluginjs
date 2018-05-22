import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import AdaptText from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('AdaptText', () => {
  describe('AdaptText()', () => {
    it('should have AdaptText', () => {
      expect(AdaptText).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(AdaptText.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(AdaptText.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(AdaptText.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const adaptText = new AdaptText(element)

      expect(adaptText).to.be.an('object')
      expect(adaptText.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const adaptText = new AdaptText(element, {
        ratio: 20,
        scrollable: true
      })

      expect(adaptText.options).to.be.an('object')
      expect(adaptText.options.ratio).to.be.equal(20)
      expect(adaptText.options.scrollable).to.be.equal(true)
      expect(adaptText.options.ratio).to.be.an('number')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asAdaptText()).to.be.equal($element)

      const api = $element.data('adaptText')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('adaptText:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asAdaptText()
      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAdaptText()
      api = $element.data('adaptText')
    })

    it('should enable the plugin', () => {
      $element.asAdaptText('disable')
      $element.asAdaptText('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('adaptText:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asAdaptText('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAdaptText()
      api = $element.data('adaptText')
    })

    it('should disable the plugin', () => {
      $element.asAdaptText('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('adaptText:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asAdaptText('disable')
      expect(called).to.be.equal(1)
    })
  })
})
