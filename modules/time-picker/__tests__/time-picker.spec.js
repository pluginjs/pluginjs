import Sample from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Sample', () => {
  describe('Sample()', () => {
    test('should have Sample', () => {
      expect(Sample).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Sample.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Sample.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Sample.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Sample.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const sample = Sample.of(generateHTMLSample())

      expect(sample).toBeObject()
      expect(sample.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const sample = Sample.of(generateHTMLSample())

      expect(sample.options).toBeObject()
    })

    test('should have classes', () => {
      const sample = Sample.of(generateHTMLSample())

      expect(sample.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Sample.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = generateHTMLSample()
      const sample = Sample.of(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(sample.classes.CONTAINER).toEqual('pj-sample-wrap')
      expect(sample.classes.ACTIVE).toEqual('pj-sample-active')
    })

    test('should override class namespace', () => {
      const element = generateHTMLSample()
      const sample = Sample.of(element, {
        classes: {
          namespace: 'sample',
          container: '{namespace}-wrap'
        }
      })

      expect(sample.classes.NAMESPACE).toEqual('sample')
      expect(sample.classes.CONTAINER).toEqual('sample-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = generateHTMLSample()
        const sample = Sample.of(element, { classes: { namespace: 'hello' } })

        expect(sample.getClass('foo')).toEqual('foo')
        expect(sample.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = generateHTMLSample()
        const sample = Sample.of(element, { classes: { namespace: 'hello' } })

        expect(sample.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(sample.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = generateHTMLSample()
        const sample = Sample.of(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(sample.getThemeClass()).toEqual('')
        expect(sample.getThemeClass('bar')).toEqual('pj-sample--bar')
        expect(sample.getThemeClass('foo bar')).toEqual(
          'pj-sample--foo pj-sample--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = generateHTMLSample()
        const sample = Sample.of(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(sample.getThemeClass()).toEqual('')
        expect(sample.getThemeClass('bar')).toEqual('hello--bar')
        expect(sample.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = generateHTMLSample()
        const sample = Sample.of(element, { theme: '{namespace}--foo' })

        // set to null for test
        sample.classes.THEME = null

        expect(sample.getThemeClass()).toEqual('pj-sample--foo')
        expect(sample.getThemeClass('bar')).toEqual('bar')
        expect(sample.getThemeClass('{namespace}--bar')).toEqual(
          'pj-sample--bar'
        )
        expect(sample.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          sample.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-sample--foo pj-sample--bar')
      })
    })

    test('should add theme class after initialize and remove after destroy', () => {
      const $element = generateHTMLSample()
      const sample = Sample.of($element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-sample--foo')).toBeTrue()
      sample.destroy()
      expect($element.hasClass('pj-sample--foo')).toBeFalse()
    })

    test('should works with more than one theme', () => {
      const $element = generateHTMLSample()
      const sample = Sample.of($element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-sample--foo')).toBeTrue()
      expect($element.hasClass('pj-sample--bar')).toBeTrue()

      sample.destroy()
      expect($element.hasClass('pj-sample--foo')).toBeFalse()
      expect($element.hasClass('pj-sample--bar')).toBeFalse()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Sample.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Sample.of(generateHTMLSample())
      expect($element.destroy()).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('sample:ready', () => {
        called++
      })

      const api = Sample.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Sample.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('sample:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Sample.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('sample:enable', () => {
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
      api = Sample.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('sample:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Sample.of($element)
    })

    test('should have I18N', () => {
      expect(Sample.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        api = Sample.of(generateHTMLSample(), {
          locale: 'zh-cn'
        })
        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('setLocale()', () => {
      test('should override default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)

        api.setLocale('zh-cn')

        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('addTransition', () => {
      test('should add transtion correctly', () => {
        Sample.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('hello')).toEqual('世界你好')
      })
    })

    describe('translate()', () => {
      test('should get translated message', () => {
        expect(api.translate('hello')).toEqual('Hello world')

        api.setLocale('zh')
        expect(api.translate('hello')).toEqual('世界你好')
      })

      test('should pass the variable to message', () => {
        expect(api.translate('greeting', { name: 'John' })).toEqual(
          'Hello John!'
        )

        api.setLocale('zh')

        expect(api.translate('greeting', { name: 'John' })).toEqual(
          'John 你好!'
        )
      })

      test('should works with plurals', () => {
        expect(
          api.translate('plurals', {
            count: '0',
            _number: 'count'
          })
        ).toEqual('no product')

        expect(
          api.translate('plurals', {
            count: '1',
            _number: 'count'
          })
        ).toEqual('1 product')

        expect(
          api.translate('plurals', {
            count: '2',
            _number: 'count'
          })
        ).toEqual('2 products')

        api.setLocale('zh')

        expect(
          api.translate('plurals', {
            count: '0',
            _number: 'count'
          })
        ).toEqual('0 个产品')

        expect(
          api.translate('plurals', {
            count: '1',
            _number: 'count'
          })
        ).toEqual('1 个产品')

        expect(
          api.translate('plurals', {
            count: '2',
            _number: 'count'
          })
        ).toEqual('2 个产品')
      })
    })
  })
})
