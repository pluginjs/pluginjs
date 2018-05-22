import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import '@pluginjs/dropdown'
import '@pluginjs/scrollable'
import FontPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('FontPicker', () => {
  describe('FontPicker()', () => {
    it('should have FontPicker', () => {
      expect(FontPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(FontPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(FontPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(FontPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(FontPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const fontPicker = new FontPicker(element)

      expect(fontPicker).to.be.an('object')
      expect(fontPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const fontPicker = new FontPicker(element)

      expect(fontPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element)

      expect($element.asFontPicker()).to.be.equal($element)

      const api = $element.data('fontPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element).asFontPicker()
      expect($element.asFontPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element).asFontPicker()
      $element.asFontPicker('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element)
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('fontPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asFontPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element).asFontPicker()
      api = $element.data('fontPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('fontPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asFontPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element).asFontPicker()
      api = $element.data('fontPicker')
    })

    it('should enable the plugin', () => {
      $element.asFontPicker('disable')
      $element.asFontPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('fontPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asFontPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      $element = $(element).asFontPicker()
      api = $element.data('fontPicker')
    })

    it('should disable the plugin', () => {
      $element.asFontPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('fontPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asFontPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
