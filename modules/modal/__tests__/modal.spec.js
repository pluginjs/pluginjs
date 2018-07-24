import Modal from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Modal', () => {
  describe('Modal()', () => {
    test('should have Modal', () => {
      expect(Modal).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Modal.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Modal.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Modal.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Modal.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const modal = new Modal({
        content: 'hello world'
      })

      expect(modal).toBeObject()
      expect(modal.options).toEqual({
        ...DEFAULTS,
        content: 'hello world'
      })
    })

    test('should have options', () => {
      const modal = new Modal({
        content: 'hello world'
      })

      expect(modal.options).toBeObject()
    })

    test('should have classes', () => {
      const modal = new Modal({
        content: 'hello world'
      })

      expect(modal.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const modal = new Modal({
        classes: {
          container: '{namespace}-body',
          active: '{namespace}-active'
        }
      })

      expect(modal.classes.CONTAINER).toEqual('pj-modal-body')
      expect(modal.classes.ACTIVE).toEqual('pj-modal-active')
    })

    test('should override class namespace', () => {
      const modal = new Modal({
        classes: {
          namespace: 'modal',
          container: '{namespace}-wrap'
        },
        content: 'hello world'
      })

      expect(modal.classes.NAMESPACE).toEqual('modal')
      expect(modal.classes.CONTAINER).toEqual('modal-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const modal = new Modal({
          classes: {
            namespace: 'hello'
          },
          content: 'hello world'
        })

        expect(modal.getClass('foo')).toEqual('foo')
        expect(modal.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const modal = new Modal({
          classes: {
            namespace: 'hello'
          },
          content: 'hello world'
        })

        expect(modal.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(modal.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const modal = new Modal({
          theme: null,
          classes: {
            theme: '{namespace}--{theme}'
          },
          content: 'hello world'
        })

        expect(modal.getThemeClass()).toEqual('')
        expect(modal.getThemeClass('bar')).toEqual('pj-modal--bar')
        expect(modal.getThemeClass('foo bar')).toEqual(
          'pj-modal--foo pj-modal--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const modal = new Modal({
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          },
          content: 'hello world'
        })

        expect(modal.getThemeClass()).toEqual('')
        expect(modal.getThemeClass('bar')).toEqual('hello--bar')
        expect(modal.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const modal = new Modal({
          theme: '{namespace}--foo',
          content: 'hello world'
        })

        // set to null for test
        modal.classes.THEME = null

        expect(modal.getThemeClass()).toEqual('pj-modal--foo')
        expect(modal.getThemeClass('bar')).toEqual('bar')
        expect(modal.getThemeClass('{namespace}--bar')).toEqual('pj-modal--bar')
        expect(modal.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          modal.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-modal--foo pj-modal--bar')
      })
    })
  })

  describe('initialize()', () => {
    const $doc = window.document.documentElement

    test('should trigger ready event', () => {
      let called = 0
      $doc.addEventListener('modal:ready', function handler() {
        called++
        $doc.removeEventListener('modal:ready', handler)
      })
      const api = new Modal({
        content: 'hello world'
      })
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    const api = new Modal({
      content: 'hello world'
    })
    const $doc = window.document.documentElement

    test('should trigger destroy event', () => {
      let called = 0
      $doc.addEventListener('modal:destroy', function handler() {
        called++
        $doc.removeEventListener('modal:ready', handler)
      })

      api.destroy()
      expect(called).toEqual(1)
    })
  })

  describe('i18n', () => {
    let api = new Modal({
      content: 'hello world'
    })

    test('should have I18N', () => {
      expect(Modal.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        api = new Modal({
          content: 'hello world',
          locale: 'zh-cn'
        })
        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('setLocale()', () => {
      test('should override default locale', () => {
        api = new Modal({
          content: 'hello world'
        })
        expect(api.getLocale()).toEqual(DEFAULTS.locale)

        api.setLocale('zh-cn')

        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('addTransition', () => {
      test('should add transtion correctly', () => {
        Modal.I18N.addTranslation('zh-tw', {
          hello: '世界妳好'
        })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        Modal.I18N.addTranslation('zh-cn', {
          hello: '世界你好'
        })
        api.setLocale('zh-cn')
        expect(api.translate('hello')).toEqual('世界你好')
      })
    })

    describe('translate()', () => {
      test('should get translated message', () => {
        api = new Modal({
          content: 'hello world'
        })
        Modal.I18N.addTranslation('zh', {
          hello: '世界你好'
        })
        Modal.I18N.addTranslation('en', {
          hello: 'Hello world'
        })
        expect(api.translate('hello')).toEqual('Hello world')
        api.setLocale('zh')
        expect(api.translate('hello')).toEqual('世界你好')
      })

      test('should pass the variable to message', () => {
        api = new Modal({
          content: 'hello world'
        })
        Modal.I18N.addTranslation('en', {
          greeting: 'Hello {name}!'
        })
        Modal.I18N.addTranslation('zh', {
          greeting: '{name} 你好!'
        })
        expect(
          api.translate('greeting', {
            name: 'John'
          })
        ).toEqual('Hello John!')

        api.setLocale('zh')

        expect(
          api.translate('greeting', {
            name: 'John'
          })
        ).toEqual('John 你好!')
      })

      // test('should works with plurals', () => {
      //   api = new Modal({
      //     content: 'hello world'
      //   })
      //   Modal.I18N.addTranslation('plurals', {
      //     greeting: '{name} 你好!'
      //   })
      //   expect(
      //     api.translate('plurals', {
      //       count: '0',
      //       _number: 'count'
      //     })
      //   ).toEqual('no product')

      //   expect(
      //     api.translate('plurals', {
      //       count: '1',
      //       _number: 'count'
      //     })
      //   ).toEqual('1 product')

      //   expect(
      //     api.translate('plurals', {
      //       count: '2',
      //       _number: 'count'
      //     })
      //   ).toEqual('2 products')

      //   api.setLocale('zh')

      //   expect(
      //     api.translate('plurals', {
      //       count: '0',
      //       _number: 'count'
      //     })
      //   ).toEqual('0 个产品')

      //   expect(
      //     api.translate('plurals', {
      //       count: '1',
      //       _number: 'count'
      //     })
      //   ).toEqual('1 个产品')

      //   expect(
      //     api.translate('plurals', {
      //       count: '2',
      //       _number: 'count'
      //     })
      //   ).toEqual('2 个产品')
      // })
    })
  })
})
