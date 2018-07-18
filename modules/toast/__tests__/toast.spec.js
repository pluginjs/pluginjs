import Toast from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Toast', () => {
  describe('Toast()', () => {
    test('should have Toast', () => {
      expect(Toast).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Toast.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Toast.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Toast.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Toast.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const toast = new Toast()

      expect(toast).toBeObject()
      expect(toast.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const toast = new Toast()

      expect(toast.options).toBeObject()
    })

    test('should have classes', () => {
      const toast = new Toast()

      expect(toast.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const toast = new Toast({
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(toast.classes.CONTAINER).toEqual('pj-toast-wrap')
      expect(toast.classes.ACTIVE).toEqual('pj-toast-active')
    })

    test('should override class namespace', () => {
      const toast = new Toast({
        classes: {
          namespace: 'toast',
          container: '{namespace}-wrap'
        }
      })

      expect(toast.classes.NAMESPACE).toEqual('toast')
      expect(toast.classes.CONTAINER).toEqual('toast-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const toast = new Toast({ classes: { namespace: 'hello' } })

        expect(toast.getClass('foo')).toEqual('foo')
        expect(toast.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const toast = new Toast({ classes: { namespace: 'hello' } })

        expect(toast.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(toast.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const toast = new Toast({
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(toast.getThemeClass()).toEqual('')
        expect(toast.getThemeClass('bar')).toEqual('pj-toast--bar')
        expect(toast.getThemeClass('foo bar')).toEqual(
          'pj-toast--foo pj-toast--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const toast = new Toast({
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(toast.getThemeClass()).toEqual('')
        expect(toast.getThemeClass('bar')).toEqual('hello--bar')
        expect(toast.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const toast = new Toast({ theme: '{namespace}--foo' })

        // set to null for test
        toast.classes.THEME = null

        expect(toast.getThemeClass()).toEqual('pj-toast--foo')
        expect(toast.getThemeClass('bar')).toEqual('bar')
        expect(toast.getThemeClass('{namespace}--bar')).toEqual('pj-toast--bar')
        expect(toast.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          toast.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-toast--foo pj-toast--bar')
      })
    })
  })

  describe('initialize()', () => {
    const api = new Toast()
    // const $element = $(window.document.body)

    afterEach(() => {
      // $element.off('toast:ready')
    })

    test('should in initialized status', () => {
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    const api = new Toast()
    const $element = api.$element

    afterEach(() => {
      $element.off('toast:destroy')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('toast:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })
})
