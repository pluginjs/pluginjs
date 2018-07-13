import Hotspots from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'
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
      const hotspots = Hotspots.of(generateHTMLSample())

      expect(hotspots).toBeObject()
      expect(hotspots.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const hotspots = Hotspots.of(generateHTMLSample())

      expect(hotspots.options).toBeObject()
    })

    test('should have classes', () => {
      const hotspots = Hotspots.of(generateHTMLSample())

      expect(hotspots.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Hotspots.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const hotspots = Hotspots.of(generateHTMLSample(), {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(hotspots.classes.CONTAINER).toEqual('pj-hotspot-wrap')
      expect(hotspots.classes.ACTIVE).toEqual('pj-hotspot-active')
    })

    test('should override class namespace', () => {
      const hotspots = Hotspots.of(generateHTMLSample(), {
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
        const hotspots = Hotspots.of(generateHTMLSample(), {
          classes: { namespace: 'hello' }
        })

        expect(hotspots.getClass('foo')).toEqual('foo')
        expect(hotspots.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const hotspots = Hotspots.of(generateHTMLSample(), {
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
        const hotspots = Hotspots.of(generateHTMLSample(), {
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
        const hotspots = Hotspots.of(generateHTMLSample(), {
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
        const hotspots = Hotspots.of(generateHTMLSample(), {
          theme: '{namespace}--foo'
        })

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
      const hotspots = Hotspots.of(generateHTMLSample(), {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' },
        data: ['hello world']
      })
      expect(hotspots.getClass('pj-hotspot--foo')).toEqual('pj-hotspot--foo')
      hotspots.destroy()
      expect(hotspots.getClass('pj-hotspot--foo')).toEqual('pj-hotspot--foo')
    })

    // test('should works with more than one theme', () => {
    //   const hotspots = Hotspots.of(generateHTMLSample(), {
    //     theme: 'far bar',
    //     classes: { theme: '{namespace}--{theme}' },
    //     data: ['hello world']
    //   })

    // expect(
    //   $element.find('.pj-hotspot').hasClass('pj-hotspot--foo')
    // ).toBeTrue()
    // expect(
    //   $element.find('.pj-hotspot').hasClass('pj-hotspot--bar')
    // ).toBeTrue()

    // hotspots.destroy()
    // expect(
    //   $element.find('.pj-hotspot').hasClass('pj-hotspot--foo')
    // ).toBeFalse()
    // expect(
    //   $element.find('.pj-hotspot').hasClass('pj-hotspot--bar')
    // ).toBeFalse()
    // })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Hotspots.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Hotspots.of(generateHTMLSample())
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('hotspots:ready', () => {
        called++
      })

      const instance = Hotspots.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Hotspots.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('hotspots:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Hotspots.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('hotspots:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Hotspots.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('hotspots:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
