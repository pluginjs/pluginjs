import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Wizard from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Wizard', () => {
  describe('Wizard()', () => {
    it('should have Wizard', () => {
      expect(Wizard).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Wizard.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Wizard.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Wizard.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Wizard.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const wizard = new Wizard(element)

      expect(wizard).to.be.an('object')
      expect(wizard.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const wizard = new Wizard(element)

      expect(wizard.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asWizard()).to.be.equal($element)

      const api = $element.data('wizard')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asWizard()
      expect($element.asWizard('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asWizard()
      expect($element.asWizard('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('wizard:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asWizard()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asWizard()
      api = $element.data('wizard')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('wizard:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asWizard('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asWizard()
      api = $element.data('wizard')
    })

    it('should enable the plugin', () => {
      $element.asWizard('disable')
      $element.asWizard('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('wizard:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asWizard('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asWizard()
      api = $element.data('wizard')
    })

    it('should disable the plugin', () => {
      $element.asWizard('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('wizard:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asWizard('disable')
      expect(called).to.be.equal(1)
    })
  })
})
