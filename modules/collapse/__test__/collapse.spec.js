import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Collapse from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Collapse', () => {
  describe('Collapse()', () => {
    test('should have Collapse', () => {
      expect(Collapse).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Collapse.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Collapse.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Collapse.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Collapse.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element)

      expect(collapse).toBeObject()
      expect(collapse.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element)

      expect(collapse.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element)

      expect(collapse.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asCollapse()).toEqual($element)

      const api = $element.data('collapse')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(collapse.classes.CONTAINER).toEqual('pj-collapse-wrap')
      expect(collapse.classes.ACTIVE).toEqual('pj-collapse-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element, {
        classes: {
          namespace: 'collapse',
          container: '{namespace}-wrap'
        }
      })

      expect(collapse.classes.NAMESPACE).toEqual('collapse')
      expect(collapse.classes.CONTAINER).toEqual('collapse-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          classes: { namespace: 'hello' }
        })

        expect(collapse.getClass('foo')).toEqual('foo')
        expect(collapse.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          classes: { namespace: 'hello' }
        })

        expect(collapse.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(collapse.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(collapse.getThemeClass()).toEqual('')
        expect(collapse.getThemeClass('bar')).toEqual('pj-collapse--bar')
        expect(collapse.getThemeClass('foo bar')).toEqual(
          'pj-collapse--foo pj-collapse--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(collapse.getThemeClass()).toEqual('')
        expect(collapse.getThemeClass('bar')).toEqual('hello--bar')
        expect(collapse.getThemeClass('foo bar')).toEqual(
          'hello--foo hello--bar'
        )
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, { theme: '{namespace}--foo' })

        // set to null for test
        collapse.classes.THEME = null

        expect(collapse.getThemeClass()).toEqual('pj-collapse--foo')
        expect(collapse.getThemeClass('bar')).toEqual('bar')
        expect(collapse.getThemeClass('{namespace}--bar')).toEqual(
          'pj-collapse--bar'
        )
        expect(collapse.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          collapse.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-collapse--foo pj-collapse--bar')
      })
    })

    test('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const collapse = new Collapse(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-collapse--foo')).toBeTrue()
      collapse.destroy()
      expect($element.hasClass('pj-collapse--foo')).toBeFalse()
    })

    test('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const collapse = new Collapse(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-collapse--foo')).toBeTrue()
      expect($element.hasClass('pj-collapse--bar')).toBeTrue()

      collapse.destroy()
      expect($element.hasClass('pj-collapse--foo')).toBeFalse()
      expect($element.hasClass('pj-collapse--bar')).toBeFalse()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asCollapse()
      expect($element.asCollapse('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asCollapse()
      expect($element.asCollapse('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('collapse:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asCollapse()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCollapse()
      api = $element.data('collapse')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('collapse:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asCollapse('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCollapse()
      api = $element.data('collapse')
    })

    test('should enable the plugin', () => {
      $element.asCollapse('disable')
      $element.asCollapse('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('collapse:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asCollapse('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCollapse()
      api = $element.data('collapse')
    })

    test('should disable the plugin', () => {
      $element.asCollapse('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('collapse:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asCollapse('disable')
      expect(called).toEqual(1)
    })
  })
})
