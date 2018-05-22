import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import ImageSelector from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ImageSelector', () => {
  describe('ImageSelector()', () => {
    it('should have ImageSelector', () => {
      expect(ImageSelector).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ImageSelector.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(ImageSelector.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(ImageSelector.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(ImageSelector.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const imageSelector = new ImageSelector(element)

      expect(imageSelector).to.be.an('object')
      expect(imageSelector.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const imageSelector = new ImageSelector(element)

      expect(imageSelector.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asImageSelector()).to.be.equal($element)

      const api = $element.data('imageSelector')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asImageSelector()
      expect($element.asImageSelector('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asImageSelector()
      $element.asImageSelector('destroy')
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

      $element.on('imageSelector:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asImageSelector()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImageSelector()
      api = $element.data('imageSelector')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('imageSelector:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asImageSelector('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImageSelector()
      api = $element.data('imageSelector')
    })

    it('should enable the plugin', () => {
      $element.asImageSelector('disable')
      $element.asImageSelector('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('imageSelector:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asImageSelector('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImageSelector()
      api = $element.data('imageSelector')
    })

    it('should disable the plugin', () => {
      $element.asImageSelector('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('imageSelector:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asImageSelector('disable')
      expect(called).to.be.equal(1)
    })
  })
})
