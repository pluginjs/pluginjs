import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Hotspots from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/tooltip'
import '@pluginjs/popover'

describe('Hotspots', () => {
  describe('Hotspots()', () => {
    it('should have Hotspots', () => {
      expect(Hotspots).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Hotspots.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Hotspots.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Hotspots.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Hotspots.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element)

      expect(hotspots).to.be.an('object')
      expect(hotspots.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element)

      expect(hotspots.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element)

      expect(hotspots.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asHotspots()).to.be.equal($element)

      const api = $element.data('hotspots')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(hotspots.classes.CONTAINER).to.be.equal('pj-hotspot-wrap')
      expect(hotspots.classes.ACTIVE).to.be.equal('pj-hotspot-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element, {
        classes: {
          namespace: 'hotspots',
          container: '{namespace}-wrap'
        }
      })

      expect(hotspots.classes.NAMESPACE).to.be.equal('hotspots')
      expect(hotspots.classes.CONTAINER).to.be.equal('hotspots-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          classes: { namespace: 'hello' }
        })

        expect(hotspots.getClass('foo')).to.be.equal('foo')
        expect(hotspots.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          classes: { namespace: 'hello' }
        })

        expect(hotspots.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          hotspots.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(hotspots.getThemeClass()).to.be.equal('')
        expect(hotspots.getThemeClass('bar')).to.be.equal('pj-hotspot--bar')
        expect(hotspots.getThemeClass('foo bar')).to.be.equal(
          'pj-hotspot--foo pj-hotspot--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(hotspots.getThemeClass()).to.be.equal('')
        expect(hotspots.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(hotspots.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, { theme: '{namespace}--foo' })

        // set to null for test
        hotspots.classes.THEME = null

        expect(hotspots.getThemeClass()).to.be.equal('pj-hotspot--foo')
        expect(hotspots.getThemeClass('bar')).to.be.equal('bar')
        expect(hotspots.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-hotspot--bar'
        )
        expect(hotspots.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          hotspots.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-hotspot--foo pj-hotspot--bar')
      })
    })

    it('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const hotspots = new Hotspots(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' },
        data: ['hello world']
      })
      expect($element.find('.pj-hotspot').hasClass('pj-hotspot--foo')).to.be
        .true
      hotspots.destroy()
      expect($element.find('.pj-hotspot').hasClass('pj-hotspot--foo')).to.be
        .false
    })

    it('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const hotspots = new Hotspots(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' },
        data: ['hello world']
      })

      expect($element.find('.pj-hotspot').hasClass('pj-hotspot--foo')).to.be
        .true
      expect($element.find('.pj-hotspot').hasClass('pj-hotspot--bar')).to.be
        .true

      hotspots.destroy()
      expect($element.find('.pj-hotspot').hasClass('pj-hotspot--foo')).to.be
        .false
      expect($element.find('.pj-hotspot').hasClass('pj-hotspot--bar')).to.be
        .false
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asHotspots()
      expect($element.asHotspots('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asHotspots()
      expect($element.asHotspots('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('hotspots:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asHotspots()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHotspots()
      api = $element.data('hotspots')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('hotspots:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asHotspots('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHotspots()
      api = $element.data('hotspots')
    })

    it('should enable the plugin', () => {
      $element.asHotspots('disable')
      $element.asHotspots('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('hotspots:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asHotspots('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHotspots()
      api = $element.data('hotspots')
    })

    it('should disable the plugin', () => {
      $element.asHotspots('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('hotspots:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asHotspots('disable')
      expect(called).to.be.equal(1)
    })
  })
})
