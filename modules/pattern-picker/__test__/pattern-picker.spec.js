import $ from 'jquery'
import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import PatternPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('PatternPicker', () => {
  describe('PatternPicker()', () => {
    it('should have PatternPicker', () => {
      expect(PatternPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(PatternPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(PatternPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(PatternPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(PatternPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const patternPicker = new PatternPicker(element)

      expect(patternPicker).to.be.an('object')
      expect(patternPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const patternPicker = new PatternPicker(element)

      expect(patternPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPatternPicker()).to.be.equal($element)

      const api = $element.data('patternPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asPatternPicker()
      expect($element.asPatternPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asPatternPicker()
      $element.asPatternPicker('destroy')
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

      $element.on('patternPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asPatternPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPatternPicker()
      api = $element.data('patternPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('patternPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asPatternPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPatternPicker()
      api = $element.data('patternPicker')
    })

    it('should enable the plugin', () => {
      $element.asPatternPicker('disable')
      $element.asPatternPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('patternPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asPatternPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPatternPicker()
      api = $element.data('patternPicker')
    })

    it('should disable the plugin', () => {
      $element.asPatternPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('patternPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asPatternPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
