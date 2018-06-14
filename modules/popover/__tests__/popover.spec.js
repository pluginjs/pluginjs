import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Popper from 'popper'
import Tooltip from '@pluginjs/tooltip'
import Popover from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Popover', () => {
  describe('Popover()', () => {
    test('should have Popover', () => {
      expect(Popover).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Popover.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Popover.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Popover.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Popover.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover).toBeObject()
      expect(popover.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPopover()).toEqual($element)

      const api = $element.data('popover')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const popover = new Popover(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(popover.classes.CONTAINER).toEqual('pj-popover-wrap')
      expect(popover.classes.ACTIVE).toEqual('pj-popover-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const popover = new Popover(element, {
        classes: {
          namespace: 'popover',
          container: '{namespace}-wrap'
        }
      })

      expect(popover.classes.NAMESPACE).toEqual('popover')
      expect(popover.classes.CONTAINER).toEqual('popover-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const popover = new Popover(element, {
          classes: { namespace: 'hello' }
        })

        expect(popover.getClass('foo')).toEqual('foo')
        expect(popover.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const popover = new Popover(element, {
          classes: { namespace: 'hello' }
        })

        expect(popover.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(popover.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asPopover()
      expect($element.asPopover('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asPopover()
      expect($element.asPopover('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('popover:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asPopover()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopover()
      api = $element.data('popover')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('popover:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asPopover('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopover()
      api = $element.data('popover')
    })

    test('should enable the plugin', () => {
      $element.asPopover('disable')
      $element.asPopover('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('popover:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asPopover('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopover()
      api = $element.data('popover')
    })

    test('should disable the plugin', () => {
      $element.asPopover('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('popover:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asPopover('disable')
      expect(called).toEqual(1)
    })
  })
})
