import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Popper from 'popper.js'
import Tooltip from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Tooltip', () => {
  describe('Tooltip()', () => {
    test('should have Tooltip', () => {
      expect(Tooltip).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tooltip.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tooltip.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tooltip.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tooltip.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip).toBeObject()
      expect(tooltip.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asTooltip()).toEqual($element)

      const api = $element.data('tooltip')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(tooltip.classes.CONTAINER).toEqual('pj-tooltip-wrap')
      expect(tooltip.classes.ACTIVE).toEqual('pj-tooltip-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element, {
        classes: {
          namespace: 'tooltip',
          container: '{namespace}-wrap'
        }
      })

      expect(tooltip.classes.NAMESPACE).toEqual('tooltip')
      expect(tooltip.classes.CONTAINER).toEqual('tooltip-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const tooltip = new Tooltip(element, {
          classes: { namespace: 'hello' }
        })

        expect(tooltip.getClass('foo')).toEqual('foo')
        expect(tooltip.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const tooltip = new Tooltip(element, {
          classes: { namespace: 'hello' }
        })

        expect(tooltip.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(tooltip.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asTooltip()
      expect($element.asTooltip('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asTooltip()
      expect($element.asTooltip('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('tooltip:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asTooltip()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTooltip()
      api = $element.data('tooltip')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('tooltip:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asTooltip('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTooltip()
      api = $element.data('tooltip')
    })

    test('should enable the plugin', () => {
      $element.asTooltip('disable')
      $element.asTooltip('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('tooltip:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asTooltip('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTooltip()
      api = $element.data('tooltip')
    })

    test('should disable the plugin', () => {
      $element.asTooltip('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('tooltip:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asTooltip('disable')
      expect(called).toEqual(1)
    })
  })
})
