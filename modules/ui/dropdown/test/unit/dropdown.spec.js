import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Popper from 'popper.js'
import Dropdown from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Dropdown', () => {
  describe('Dropdown()', () => {
    it('should have Dropdown', () => {
      expect(Dropdown).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Dropdown.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Dropdown.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Dropdown.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Dropdown.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const dropdown = new Dropdown(element)

      expect(dropdown).to.be.an('object')
    })

    it('should have options', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const dropdown = new Dropdown(element)

      expect(dropdown.options).to.be.an('object')
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

      expect($element.asDropdown()).to.be.equal($element)

      const api = $element.data('dropdown')

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
      const $element = $(element).asDropdown()
      expect($element.asDropdown('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const container = document.createElement('div')
      const element = document.createElement('div')
      const ul = document.createElement('ul')
      container.appendChild(element)
      container.appendChild(ul)
      const $element = $(element).asDropdown()
      expect($element.asDropdown('destroy')).to.be.equal($element)
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

      $element.on('dropdown:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asDropdown()
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
      $element = $(element).asDropdown()
      api = $element.data('dropdown')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('dropdown:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asDropdown('destroy')
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
      $element = $(element).asDropdown()
      api = $element.data('dropdown')
    })

    it('should enable the plugin', () => {
      $element.asDropdown('disable')
      $element.asDropdown('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('dropdown:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asDropdown('enable')
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
      $element = $(element).asDropdown()
      api = $element.data('dropdown')
    })

    it('should disable the plugin', () => {
      $element.asDropdown('disable')
      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('dropdown:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asDropdown('disable')
      expect(called).to.be.equal(1)
    })
  })
})
