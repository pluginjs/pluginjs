import BeforeAfter from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

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
      const beforeAfter = BeforeAfter.of(generateHTMLSample())

      expect(beforeAfter).toBeObject()
      expect(beforeAfter.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const beforeAfter = BeforeAfter.of(generateHTMLSample())

      expect(beforeAfter.options).toBeObject()
    })

    test('should have classes', () => {
      const beforeAfter = BeforeAfter.of(generateHTMLSample())

      expect(beforeAfter.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = BeforeAfter.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(beforeAfter.classes.CONTAINER).toEqual('pj-beforeAfter-wrap')
      expect(beforeAfter.classes.ACTIVE).toEqual('pj-beforeAfter-active')
    })

    test('should override class namespace', () => {
      const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
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
        const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
          classes: { namespace: 'hello' }
        })

        expect(beforeAfter.getClass('foo')).toEqual('foo')
        expect(beforeAfter.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
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
        const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
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
        const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
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
        const beforeAfter = BeforeAfter.of(generateHTMLSample(), {
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
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = BeforeAfter.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = BeforeAfter.of(generateHTMLSample())
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

      $element.addEventListener('beforeAfter:ready', () => {
        called++
      })

      const instance = BeforeAfter.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BeforeAfter.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:destroy', () => {
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
      api = BeforeAfter.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:enable', () => {
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
      api = BeforeAfter.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('beforeAfter:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
