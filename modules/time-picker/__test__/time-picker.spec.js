import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Sample from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Sample', () => {
  describe('Sample()', () => {
    it('should have Sample', () => {
      expect(Sample).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Sample.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Sample.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Sample.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Sample.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const sample = new Sample(element)

      expect(sample).to.be.an('object')
      expect(sample.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const sample = new Sample(element)

      expect(sample.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const sample = new Sample(element)

      expect(sample.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asSample()).to.be.equal($element)

      const api = $element.data('sample')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const sample = new Sample(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(sample.classes.CONTAINER).to.be.equal('pj-sample-wrap')
      expect(sample.classes.ACTIVE).to.be.equal('pj-sample-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const sample = new Sample(element, {
        classes: {
          namespace: 'sample',
          container: '{namespace}-wrap'
        }
      })

      expect(sample.classes.NAMESPACE).to.be.equal('sample')
      expect(sample.classes.CONTAINER).to.be.equal('sample-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const sample = new Sample(element, { classes: { namespace: 'hello' } })

        expect(sample.getClass('foo')).to.be.equal('foo')
        expect(sample.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const sample = new Sample(element, { classes: { namespace: 'hello' } })

        expect(sample.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          sample.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const sample = new Sample(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(sample.getThemeClass()).to.be.equal('')
        expect(sample.getThemeClass('bar')).to.be.equal('pj-sample--bar')
        expect(sample.getThemeClass('foo bar')).to.be.equal(
          'pj-sample--foo pj-sample--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const sample = new Sample(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(sample.getThemeClass()).to.be.equal('')
        expect(sample.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(sample.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const sample = new Sample(element, { theme: '{namespace}--foo' })

        // set to null for test
        sample.classes.THEME = null

        expect(sample.getThemeClass()).to.be.equal('pj-sample--foo')
        expect(sample.getThemeClass('bar')).to.be.equal('bar')
        expect(sample.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-sample--bar'
        )
        expect(sample.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          sample.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-sample--foo pj-sample--bar')
      })
    })

    it('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const sample = new Sample(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-sample--foo')).to.be.true
      sample.destroy()
      expect($element.hasClass('pj-sample--foo')).to.be.false
    })

    it('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const sample = new Sample(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-sample--foo')).to.be.true
      expect($element.hasClass('pj-sample--bar')).to.be.true

      sample.destroy()
      expect($element.hasClass('pj-sample--foo')).to.be.false
      expect($element.hasClass('pj-sample--bar')).to.be.false
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asSample()
      expect($element.asSample('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asSample()
      expect($element.asSample('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('sample:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSample()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSample()
      api = $element.data('sample')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('sample:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSample('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSample()
      api = $element.data('sample')
    })

    it('should enable the plugin', () => {
      $element.asSample('disable')
      $element.asSample('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('sample:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSample('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSample()
      api = $element.data('sample')
    })

    it('should disable the plugin', () => {
      $element.asSample('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('sample:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSample('disable')
      expect(called).to.be.equal(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asSample()
      api = $element.data('sample')
    })

    it('should have I18N', () => {
      expect(Sample.I18N).to.be.an('object')
    })

    describe('getLocale()', () => {
      it('should get default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)
      })

      it('should get locale with options set', () => {
        $element = $(document.createElement('div')).asSample({
          locale: 'zh-cn'
        })
        api = $element.data('sample')
        expect(api.getLocale()).to.be.equal('zh-cn')
      })
    })

    describe('setLocale()', () => {
      it('should override default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)

        api.setLocale('zh-cn')

        expect(api.getLocale()).to.be.equal('zh-cn')
      })
    })

    describe('addTransition', () => {
      it('should add transtion correctly', () => {
        Sample.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).to.be.equal('世界妳好')
      })
    })

    describe('fallbacks', () => {
      it('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('hello')).to.be.equal('世界你好')
      })
    })

    describe('translate()', () => {
      it('should get translated message', () => {
        expect(api.translate('hello')).to.be.equal('Hello world')

        api.setLocale('zh')
        expect(api.translate('hello')).to.be.equal('世界你好')
      })

      it('should pass the variable to message', () => {
        expect(api.translate('greeting', { name: 'John' })).to.be.equal(
          'Hello John!'
        )

        api.setLocale('zh')

        expect(api.translate('greeting', { name: 'John' })).to.be.equal(
          'John 你好!'
        )
      })

      it('should works with plurals', () => {
        expect(
          api.translate('plurals', {
            count: '0',
            _number: 'count'
          })
        ).to.be.equal('no product')

        expect(
          api.translate('plurals', {
            count: '1',
            _number: 'count'
          })
        ).to.be.equal('1 product')

        expect(
          api.translate('plurals', {
            count: '2',
            _number: 'count'
          })
        ).to.be.equal('2 products')

        api.setLocale('zh')

        expect(
          api.translate('plurals', {
            count: '0',
            _number: 'count'
          })
        ).to.be.equal('0 个产品')

        expect(
          api.translate('plurals', {
            count: '1',
            _number: 'count'
          })
        ).to.be.equal('1 个产品')

        expect(
          api.translate('plurals', {
            count: '2',
            _number: 'count'
          })
        ).to.be.equal('2 个产品')
      })
    })
  })
})
