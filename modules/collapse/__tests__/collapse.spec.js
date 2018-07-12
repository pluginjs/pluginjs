import Collapse from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

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
      const collapse = Collapse.of(generateHTMLSample())
      expect(collapse).toBeObject()
      expect(collapse.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const collapse = Collapse.of(generateHTMLSample())

      expect(collapse.options).toBeObject()
    })

    test('should have classes', () => {
      const collapse = Collapse.of(generateHTMLSample())

      expect(collapse.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Collapse.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const collapse = Collapse.of(generateHTMLSample(), {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(collapse.classes.CONTAINER).toEqual('pj-collapse-wrap')
      expect(collapse.classes.ACTIVE).toEqual('pj-collapse-active')
    })

    test('should override class namespace', () => {
      const collapse = Collapse.of(generateHTMLSample(), {
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
        const collapse = Collapse.of(generateHTMLSample(), {
          classes: { namespace: 'hello' }
        })

        expect(collapse.getClass('foo')).toEqual('foo')
        expect(collapse.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const collapse = Collapse.of(generateHTMLSample(), {
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
        const collapse = Collapse.of(generateHTMLSample(), {
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
        const collapse = Collapse.of(generateHTMLSample(), {
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
        const collapse = Collapse.of(generateHTMLSample(), {
          theme: '{namespace}--foo'
        })

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
      const collapse = Collapse.of(generateHTMLSample(), {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect(collapse.getThemeClass()).toEqual('pj-collapse--foo')
      collapse.destroy()
      expect(collapse.getThemeClass()).toEqual('pj-collapse--foo')
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Collapse.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Collapse.of(generateHTMLSample())
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

      $element.addEventListener('collapse:ready', () => {
        called++
      })

      const instance = Collapse.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
