import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Popper from 'popper'
import Tooltip from '@pluginjs/tooltip'
import Popover from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Popover', () => {
  describe('Popover()', () => {
    it('should have Popover', () => {
      expect(Popover).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Popover.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Popover.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Popover.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Popover.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover).to.be.an('object')
      expect(popover.options).to.be.an('object')
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPopover()).to.be.equal($element)

      const api = $element.data('popover')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const popover = new Popover(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(popover.classes.CONTAINER).to.be.equal('pj-popover-wrap')
      expect(popover.classes.ACTIVE).to.be.equal('pj-popover-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const popover = new Popover(element, {
        classes: {
          namespace: 'popover',
          container: '{namespace}-wrap'
        }
      })

      expect(popover.classes.NAMESPACE).to.be.equal('popover')
      expect(popover.classes.CONTAINER).to.be.equal('popover-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const popover = new Popover(element, {
          classes: { namespace: 'hello' }
        })

        expect(popover.getClass('foo')).to.be.equal('foo')
        expect(popover.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const popover = new Popover(element, {
          classes: { namespace: 'hello' }
        })

        expect(popover.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          popover.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asPopover()
      expect($element.asPopover('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asPopover()
      expect($element.asPopover('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('popover:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asPopover()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopover()
      api = $element.data('popover')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('popover:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asPopover('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopover()
      api = $element.data('popover')
    })

    it('should enable the plugin', () => {
      $element.asPopover('disable')
      $element.asPopover('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('popover:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asPopover('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopover()
      api = $element.data('popover')
    })

    it('should disable the plugin', () => {
      $element.asPopover('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('popover:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asPopover('disable')
      expect(called).to.be.equal(1)
    })
  })
})
