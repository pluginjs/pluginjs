import TimePicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('TimePicker', () => {
  describe('TimePicker()', () => {
    test('should have TimePicker', () => {
      expect(TimePicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(TimePicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(TimePicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(TimePicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(TimePicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const timePicker = TimePicker.of(generateHTMLSample())

      expect(timePicker).toBeObject()
      expect(timePicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const timePicker = TimePicker.of(generateHTMLSample())

      expect(timePicker.options).toBeObject()
    })

    test('should have classes', () => {
      const timePicker = TimePicker.of(generateHTMLSample())

      expect(timePicker.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = generateHTMLSample()
      const timePicker = TimePicker.of(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(timePicker.classes.CONTAINER).toEqual('pj-timePicker-wrap')
      expect(timePicker.classes.ACTIVE).toEqual('pj-timePicker-active')
    })

    test('should override class namespace', () => {
      const element = generateHTMLSample()
      const timePicker = TimePicker.of(element, {
        classes: {
          namespace: 'timePicker',
          container: '{namespace}-wrap'
        }
      })

      expect(timePicker.classes.NAMESPACE).toEqual('timePicker')
      expect(timePicker.classes.CONTAINER).toEqual('timePicker-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = generateHTMLSample()
        const timePicker = TimePicker.of(element, {
          classes: { namespace: 'hello' }
        })

        expect(timePicker.getClass('foo')).toEqual('foo')
        expect(timePicker.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = generateHTMLSample()
        const timePicker = TimePicker.of(element, {
          classes: { namespace: 'hello' }
        })

        expect(timePicker.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(
          timePicker.getClass('{namespace}-{arg}', 'arg', 'value')
        ).toEqual('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = generateHTMLSample()
        const timePicker = TimePicker.of(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(timePicker.getThemeClass()).toEqual('')
        expect(timePicker.getThemeClass('bar')).toEqual('pj-timePicker--bar')
        expect(timePicker.getThemeClass('foo bar')).toEqual(
          'pj-timePicker--foo pj-timePicker--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = generateHTMLSample()
        const timePicker = TimePicker.of(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(timePicker.getThemeClass()).toEqual('')
        expect(timePicker.getThemeClass('bar')).toEqual('hello--bar')
        expect(timePicker.getThemeClass('foo bar')).toEqual(
          'hello--foo hello--bar'
        )
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = generateHTMLSample()
        const timePicker = TimePicker.of(element, { theme: '{namespace}--foo' })

        // set to null for test
        timePicker.classes.THEME = null

        expect(timePicker.getThemeClass()).toEqual('pj-timePicker--foo')
        expect(timePicker.getThemeClass('bar')).toEqual('bar')
        expect(timePicker.getThemeClass('{namespace}--bar')).toEqual(
          'pj-timePicker--bar'
        )
        expect(timePicker.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          timePicker.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-timePicker--foo pj-timePicker--bar')
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = TimePicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('timePicker:ready', () => {
        called++
      })

      const api = TimePicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TimePicker.of($element)
    })

    it('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()
      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('timePicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample('00:00')
      api = TimePicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('00:00')
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = TimePicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('00:00')
        }
      })

      api.val('00:00')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = TimePicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('00:00')
        }
      })

      api.set('00:00')

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TimePicker.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeNil()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TimePicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeNil()

      api.set('00:00')
      expect(api.get()).toBeString('00:00')
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TimePicker.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeNil()
    })

    test('should set the value', () => {
      api.val('00:30')

      expect(api.get()).toBeString('00:30')
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TimePicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('timePicker:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TimePicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('timePicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
