import $ from 'jquery'
import Spinner from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Spinner', () => {
  describe('Spinner()', () => {
    it('should have Spinner', () => {
      expect(Spinner).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Spinner.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Spinner.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Spinner.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Spinner.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const spinner = new Spinner(element)

      expect(spinner).to.be.an('object')
      expect(spinner.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const spinner = new Spinner(element)

      expect(spinner.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSpinner()).to.be.equal($element)

      const api = $element.data('spinner')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asSpinner()
      expect($element.asSpinner('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asSpinner()
      expect($element.asSpinner('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('spinner:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSpinner()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSpinner()
      api = $element.data('spinner')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('spinner:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSpinner('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSpinner()
      api = $element.data('spinner')
    })

    it('should enable the plugin', () => {
      $element.asSpinner('disable')
      $element.asSpinner('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('spinner:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSpinner('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSpinner()
      api = $element.data('spinner')
    })

    it('should disable the plugin', () => {
      $element.asSpinner('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('spinner:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSpinner('disable')
      expect(called).to.be.equal(1)
    })
  })
})
