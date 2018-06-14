import $ from 'jquery'
import '@pluginjs/dropdown'
import Units from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = ['px', '%']
describe('Units', () => {
  describe('Units()', () => {
    test('should have Units', () => {
      expect(Units).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Units.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Units.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Units.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Units.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const units = new Units(element, { data })

      expect(units).toBeObject()
      expect(units.options).toEqual({
        ...DEFAULTS,
        data
      })
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const units = new Units(element, { data })

      expect(units.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const units = new Units(element, { data })

      expect(units.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asUnits({ data })).toEqual($element)

      const api = $element.data('units')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const units = new Units(element, {
        data,
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        } // ,
        // data
      })

      expect(units.classes.CONTAINER).toEqual('pj-units-wrap')
      expect(units.classes.ACTIVE).toEqual('pj-units-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const units = new Units(element, {
        data,
        classes: {
          namespace: 'units',
          container: '{namespace}-wrap'
        } // ,
        // data
      })

      expect(units.classes.NAMESPACE).toEqual('units')
      expect(units.classes.CONTAINER).toEqual('units-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(units.getClass('foo')).toEqual('foo')
        expect(units.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(units.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(units.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(units.getThemeClass()).toEqual('')
        expect(units.getThemeClass('bar')).toEqual('pj-units--bar')
        expect(units.getThemeClass('foo bar')).toEqual(
          'pj-units--foo pj-units--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          } // ,
          // data
        })

        expect(units.getThemeClass()).toEqual('')
        expect(units.getThemeClass('bar')).toEqual('hello--bar')
        expect(units.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          theme: '{namespace}--foo'
        })

        // set to null for test
        units.classes.THEME = null

        expect(units.getThemeClass()).toEqual('pj-units--foo')
        expect(units.getThemeClass('bar')).toEqual('bar')
        expect(units.getThemeClass('{namespace}--bar')).toEqual('pj-units--bar')
        expect(units.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          units.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-units--foo pj-units--bar')
      })
    })

    test('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      // const $element = $(element)
      const units = new Units(element, {
        data,
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect(units.$wrap.hasClass('pj-units--foo')).toBeTrue()
      units.destroy()
      expect(units.$wrap.hasClass('pj-units--foo')).toBeFalse()
    })

    test('should works with more than one theme', () => {
      const element = document.createElement('div')
      // const $element = $(element)
      const units = new Units(element, {
        data,
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect(units.$wrap.hasClass('pj-units--foo')).toBeTrue()
      expect(units.$wrap.hasClass('pj-units--bar')).toBeTrue()
      units.destroy()
      expect(units.$wrap.hasClass('pj-units--foo')).toBeFalse()
      expect(units.$wrap.hasClass('pj-units--bar')).toBeFalse()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asUnits({ data })
      expect($element.asUnits('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asUnits({ data })
      expect($element.asUnits('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('units:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asUnits({ data })
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asUnits({ data })
      // api =
      $element.data('units')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('units:destroy', (event, api) => {
        console.log('11111111111')
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asUnits('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asUnits({ data })
      api = $element.data('units')
    })

    test('should enable the plugin', () => {
      $element.asUnits('disable')
      $element.asUnits('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('units:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asUnits('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asUnits({ data })
      api = $element.data('units')
    })

    test('should disable the plugin', () => {
      $element.asUnits('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('units:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asUnits('disable')
      expect(called).toEqual(1)
    })
  })
})
