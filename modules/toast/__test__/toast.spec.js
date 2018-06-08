import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Toast from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Toast', () => {
  describe('Toast()', () => {
    it('should have Toast', () => {
      expect(Toast).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Toast.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Toast.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Toast.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Toast.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work correctly', () => {
      const toast = new Toast()

      expect(toast).to.be.an('object')
      // expect(toast.options).to.be.eql(DEFAULTS);
    })

    it('should have options', () => {
      const toast = new Toast()

      expect(toast.options).to.be.an('object')
    })

    it('should have classes', () => {
      const toast = new Toast()

      expect(toast.classes).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const toast = new Toast({
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(toast.classes.CONTAINER).to.be.equal('pj-toast-wrap')
      expect(toast.classes.ACTIVE).to.be.equal('pj-toast-active')
    })

    it('should override class namespace', () => {
      const toast = new Toast({
        classes: {
          namespace: 'toast',
          container: '{namespace}-wrap'
        }
      })

      expect(toast.classes.NAMESPACE).to.be.equal('toast')
      expect(toast.classes.CONTAINER).to.be.equal('toast-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const toast = new Toast({ classes: { namespace: 'hello' } })

        expect(toast.getClass('foo')).to.be.equal('foo')
        expect(toast.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const toast = new Toast({ classes: { namespace: 'hello' } })

        expect(toast.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(toast.getClass('{namespace}-{arg}', 'arg', 'value')).to.be.equal(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const toast = new Toast({
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(toast.getThemeClass()).to.be.equal('')
        expect(toast.getThemeClass('bar')).to.be.equal('pj-toast--bar')
        expect(toast.getThemeClass('foo bar')).to.be.equal(
          'pj-toast--foo pj-toast--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const toast = new Toast({
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(toast.getThemeClass()).to.be.equal('')
        expect(toast.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(toast.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const toast = new Toast({ theme: '{namespace}--foo' })

        // set to null for test
        toast.classes.THEME = null

        expect(toast.getThemeClass()).to.be.equal('pj-toast--foo')
        expect(toast.getThemeClass('bar')).to.be.equal('bar')
        expect(toast.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-toast--bar'
        )
        expect(toast.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          toast.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-toast--foo pj-toast--bar')
      })
    })
  })

  describe('initialize()', () => {
    const api = new Toast()
    const $element = $(window.document.body)

    afterEach(() => {
      $element.off('toast:ready')
    })

    it('should in initialized status', () => {
      expect(api.is('initialized')).to.be.true
    })
  })

  describe('destroy()', () => {
    const api = new Toast()
    const $element = api.$element

    afterEach(() => {
      $element.off('toast:destroy')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('toast:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      api.destroy()

      expect(called).to.be.equal(1)
    })
  })
})
