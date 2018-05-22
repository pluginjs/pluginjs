import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Popper from 'popper.js'
import Tooltip from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Tooltip', () => {
  describe('Tooltip()', () => {
    it('should have Tooltip', () => {
      expect(Tooltip).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Tooltip.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Tooltip.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Tooltip.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Tooltip.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip).to.be.an('object')
      expect(tooltip.options).to.be.an('object')
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asTooltip()).to.be.equal($element)

      const api = $element.data('tooltip')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(tooltip.classes.CONTAINER).to.be.equal('pj-tooltip-wrap')
      expect(tooltip.classes.ACTIVE).to.be.equal('pj-tooltip-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element, {
        classes: {
          namespace: 'tooltip',
          container: '{namespace}-wrap'
        }
      })

      expect(tooltip.classes.NAMESPACE).to.be.equal('tooltip')
      expect(tooltip.classes.CONTAINER).to.be.equal('tooltip-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const tooltip = new Tooltip(element, {
          classes: { namespace: 'hello' }
        })

        expect(tooltip.getClass('foo')).to.be.equal('foo')
        expect(tooltip.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const tooltip = new Tooltip(element, {
          classes: { namespace: 'hello' }
        })

        expect(tooltip.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          tooltip.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asTooltip()
      expect($element.asTooltip('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asTooltip()
      expect($element.asTooltip('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('tooltip:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asTooltip()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTooltip()
      api = $element.data('tooltip')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('tooltip:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asTooltip('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTooltip()
      api = $element.data('tooltip')
    })

    it('should enable the plugin', () => {
      $element.asTooltip('disable')
      $element.asTooltip('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('tooltip:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asTooltip('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTooltip()
      api = $element.data('tooltip')
    })

    it('should disable the plugin', () => {
      $element.asTooltip('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('tooltip:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asTooltip('disable')
      expect(called).to.be.equal(1)
    })
  })
})
