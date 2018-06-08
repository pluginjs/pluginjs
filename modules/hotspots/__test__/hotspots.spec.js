import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Hotspots from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/tooltip'
import '@pluginjs/popover'

describe('Hotspots', () => {
  describe('Hotspots()', () => {
    test('should have Hotspots', () => {
      expect(Hotspots).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Hotspots.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Hotspots.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Hotspots.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Hotspots.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element)

      expect(hotspots).toBeObject()
      expect(hotspots.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element)

      expect(hotspots.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element)

      expect(hotspots.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asHotspots()).toEqual($element)

      const api = $element.data('hotspots')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(hotspots.classes.CONTAINER).toEqual('pj-hotspot-wrap')
      expect(hotspots.classes.ACTIVE).toEqual('pj-hotspot-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const hotspots = new Hotspots(element, {
        classes: {
          namespace: 'hotspots',
          container: '{namespace}-wrap'
        }
      })

      expect(hotspots.classes.NAMESPACE).toEqual('hotspots')
      expect(hotspots.classes.CONTAINER).toEqual('hotspots-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          classes: { namespace: 'hello' }
        })

        expect(hotspots.getClass('foo')).toEqual('foo')
        expect(hotspots.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          classes: { namespace: 'hello' }
        })

        expect(hotspots.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(hotspots.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(hotspots.getThemeClass()).toEqual('')
        expect(hotspots.getThemeClass('bar')).toEqual('pj-hotspot--bar')
        expect(hotspots.getThemeClass('foo bar')).toEqual(
          'pj-hotspot--foo pj-hotspot--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(hotspots.getThemeClass()).toEqual('')
        expect(hotspots.getThemeClass('bar')).toEqual('hello--bar')
        expect(hotspots.getThemeClass('foo bar')).toEqual(
          'hello--foo hello--bar'
        )
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const hotspots = new Hotspots(element, { theme: '{namespace}--foo' })

        // set to null for test
        hotspots.classes.THEME = null

        expect(hotspots.getThemeClass()).toEqual('pj-hotspot--foo')
        expect(hotspots.getThemeClass('bar')).toEqual('bar')
        expect(hotspots.getThemeClass('{namespace}--bar')).toEqual(
          'pj-hotspot--bar'
        )
        expect(hotspots.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          hotspots.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-hotspot--foo pj-hotspot--bar')
      })
    })

    test('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const hotspots = new Hotspots(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' },
        data: ['hello world']
      })
      expect(
        $element.find('.pj-hotspot').hasClass('pj-hotspot--foo')
      ).toBeTrue()
      hotspots.destroy()
      expect(
        $element.find('.pj-hotspot').hasClass('pj-hotspot--foo')
      ).toBeFalse()
    })

    test('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const hotspots = new Hotspots(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' },
        data: ['hello world']
      })

      expect(
        $element.find('.pj-hotspot').hasClass('pj-hotspot--foo')
      ).toBeTrue()
      expect(
        $element.find('.pj-hotspot').hasClass('pj-hotspot--bar')
      ).toBeTrue()

      hotspots.destroy()
      expect(
        $element.find('.pj-hotspot').hasClass('pj-hotspot--foo')
      ).toBeFalse()
      expect(
        $element.find('.pj-hotspot').hasClass('pj-hotspot--bar')
      ).toBeFalse()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asHotspots()
      expect($element.asHotspots('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asHotspots()
      expect($element.asHotspots('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('hotspots:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asHotspots()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHotspots()
      api = $element.data('hotspots')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('hotspots:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asHotspots('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHotspots()
      api = $element.data('hotspots')
    })

    test('should enable the plugin', () => {
      $element.asHotspots('disable')
      $element.asHotspots('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('hotspots:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asHotspots('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asHotspots()
      api = $element.data('hotspots')
    })

    test('should disable the plugin', () => {
      $element.asHotspots('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('hotspots:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asHotspots('disable')
      expect(called).toEqual(1)
    })
  })
})
