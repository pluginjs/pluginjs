import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import BeforeAfter from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('BeforeAfter', () => {
  describe('BeforeAfter()', () => {
    test('should have BeforeAfter', () => {
      expect(BeforeAfter).toBeFunction()
    })

    test('should have defaults', () => {
      expect(BeforeAfter.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(BeforeAfter.events).toBeObject()
    })

    test('should have classes', () => {
      expect(BeforeAfter.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(BeforeAfter.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element)

      expect(beforeAfter).toBeObject()
      expect(beforeAfter.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element)

      expect(beforeAfter.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element)

      expect(beforeAfter.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asBeforeAfter()).toEqual($element)

      const api = $element.data('beforeAfter')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(beforeAfter.classes.CONTAINER).toEqual('pj-beforeAfter-wrap')
      expect(beforeAfter.classes.ACTIVE).toEqual('pj-beforeAfter-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element, {
        classes: {
          namespace: 'beforeAfter',
          container: '{namespace}-wrap'
        }
      })

      expect(beforeAfter.classes.NAMESPACE).toEqual('beforeAfter')
      expect(beforeAfter.classes.CONTAINER).toEqual('beforeAfter-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          classes: { namespace: 'hello' }
        })

        expect(beforeAfter.getClass('foo')).toEqual('foo')
        expect(beforeAfter.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          classes: { namespace: 'hello' }
        })

        expect(beforeAfter.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(
          beforeAfter.getClass('{namespace}-{arg}', 'arg', 'value')
        ).toEqual('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(beforeAfter.getThemeClass()).toEqual('')
        expect(beforeAfter.getThemeClass('bar')).toEqual('pj-beforeAfter--bar')
        expect(beforeAfter.getThemeClass('foo bar')).toEqual(
          'pj-beforeAfter--foo pj-beforeAfter--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(beforeAfter.getThemeClass()).toEqual('')
        expect(beforeAfter.getThemeClass('bar')).toEqual('hello--bar')
        expect(beforeAfter.getThemeClass('foo bar')).toEqual(
          'hello--foo hello--bar'
        )
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          theme: '{namespace}--foo'
        })

        // set to null for test
        beforeAfter.classes.THEME = null

        expect(beforeAfter.getThemeClass()).toEqual('pj-beforeAfter--foo')
        expect(beforeAfter.getThemeClass('bar')).toEqual('bar')
        expect(beforeAfter.getThemeClass('{namespace}--bar')).toEqual(
          'pj-beforeAfter--bar'
        )
        expect(beforeAfter.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          beforeAfter.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-beforeAfter--foo pj-beforeAfter--bar')
      })
    })

    test('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const beforeAfter = new BeforeAfter(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-beforeAfter--foo')).toBeTrue()
      beforeAfter.destroy()
      expect($element.hasClass('pj-beforeAfter--foo')).toBeFalse()
    })

    test('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const beforeAfter = new BeforeAfter(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-beforeAfter--foo')).toBeTrue()
      expect($element.hasClass('pj-beforeAfter--bar')).toBeTrue()

      beforeAfter.destroy()
      expect($element.hasClass('pj-beforeAfter--foo')).toBeFalse()
      expect($element.hasClass('pj-beforeAfter--bar')).toBeFalse()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asBeforeAfter()
      expect($element.asBeforeAfter('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asBeforeAfter()
      expect($element.asBeforeAfter('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('beforeAfter:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asBeforeAfter()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBeforeAfter()
      api = $element.data('beforeAfter')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('beforeAfter:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asBeforeAfter('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBeforeAfter()
      api = $element.data('beforeAfter')
    })

    test('should enable the plugin', () => {
      $element.asBeforeAfter('disable')
      $element.asBeforeAfter('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('beforeAfter:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asBeforeAfter('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBeforeAfter()
      api = $element.data('beforeAfter')
    })

    test('should disable the plugin', () => {
      $element.asBeforeAfter('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('beforeAfter:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asBeforeAfter('disable')
      expect(called).toEqual(1)
    })
  })
})
