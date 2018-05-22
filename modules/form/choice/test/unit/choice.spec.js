import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Choice from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Choice', () => {
  describe('Choice()', () => {
    it('should have Choice', () => {
      expect(Choice).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Choice.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Choice.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Choice.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Choice.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const choice = new Choice(element)

      expect(choice).to.be.an('object')
      expect(choice.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const choice = new Choice(element)

      expect(choice.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asChoice()).to.be.equal($element)

      const api = $element.data('choice')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asChoice()
      expect($element.asChoice('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asChoice()
      $element.asChoice('destroy')
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

      $element.on('choice:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asChoice()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asChoice()
      api = $element.data('choice')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('choice:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asChoice('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asChoice()
      api = $element.data('choice')
    })

    it('should enable the plugin', () => {
      $element.asChoice('disable')
      $element.asChoice('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('choice:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asChoice('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asChoice()
      api = $element.data('choice')
    })

    it('should disable the plugin', () => {
      $element.asChoice('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('choice:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asChoice('disable')
      expect(called).to.be.equal(1)
    })
  })
})
