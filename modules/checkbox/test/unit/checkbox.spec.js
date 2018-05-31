import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Checkbox from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Checkbox', () => {
  describe('Checkbox()', () => {
    it('should have Checkbox', () => {
      expect(Checkbox).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Checkbox.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Checkbox.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Checkbox.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Checkbox.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const checkbox = new Checkbox(element)

      expect(checkbox).to.be.an('object')
      expect(checkbox.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const checkbox = new Checkbox(element)

      expect(checkbox.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asCheckbox()).to.be.equal($element)

      const api = $element.data('checkbox')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asCheckbox()
      expect($element.asCheckbox('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asCheckbox()
      $element.asCheckbox('destroy')
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

      $element.on('checkbox:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asCheckbox()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCheckbox()
      api = $element.data('checkbox')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('checkbox:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asCheckbox('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCheckbox()
      api = $element.data('checkbox')
    })

    it('should enable the plugin', () => {
      $element.asCheckbox('disable')
      $element.asCheckbox('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('checkbox:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asCheckbox('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCheckbox()
      api = $element.data('checkbox')
    })

    it('should disable the plugin', () => {
      $element.asCheckbox('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('checkbox:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asCheckbox('disable')
      expect(called).to.be.equal(1)
    })
  })
})
