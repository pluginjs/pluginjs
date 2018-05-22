import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import BeforeAfter from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('BeforeAfter', () => {
  describe('BeforeAfter()', () => {
    it('should have BeforeAfter', () => {
      expect(BeforeAfter).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(BeforeAfter.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(BeforeAfter.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(BeforeAfter.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(BeforeAfter.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element)

      expect(beforeAfter).to.be.an('object')
      expect(beforeAfter.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element)

      expect(beforeAfter.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element)

      expect(beforeAfter.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asBeforeAfter()).to.be.equal($element)

      const api = $element.data('beforeAfter')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(beforeAfter.classes.CONTAINER).to.be.equal('pj-beforeAfter-wrap')
      expect(beforeAfter.classes.ACTIVE).to.be.equal('pj-beforeAfter-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const beforeAfter = new BeforeAfter(element, {
        classes: {
          namespace: 'beforeAfter',
          container: '{namespace}-wrap'
        }
      })

      expect(beforeAfter.classes.NAMESPACE).to.be.equal('beforeAfter')
      expect(beforeAfter.classes.CONTAINER).to.be.equal('beforeAfter-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          classes: { namespace: 'hello' }
        })

        expect(beforeAfter.getClass('foo')).to.be.equal('foo')
        expect(beforeAfter.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          classes: { namespace: 'hello' }
        })

        expect(beforeAfter.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          beforeAfter.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(beforeAfter.getThemeClass()).to.be.equal('')
        expect(beforeAfter.getThemeClass('bar')).to.be.equal(
          'pj-beforeAfter--bar'
        )
        expect(beforeAfter.getThemeClass('foo bar')).to.be.equal(
          'pj-beforeAfter--foo pj-beforeAfter--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(beforeAfter.getThemeClass()).to.be.equal('')
        expect(beforeAfter.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(beforeAfter.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const beforeAfter = new BeforeAfter(element, {
          theme: '{namespace}--foo'
        })

        // set to null for test
        beforeAfter.classes.THEME = null

        expect(beforeAfter.getThemeClass()).to.be.equal('pj-beforeAfter--foo')
        expect(beforeAfter.getThemeClass('bar')).to.be.equal('bar')
        expect(beforeAfter.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-beforeAfter--bar'
        )
        expect(beforeAfter.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          beforeAfter.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-beforeAfter--foo pj-beforeAfter--bar')
      })
    })

    it('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const beforeAfter = new BeforeAfter(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-beforeAfter--foo')).to.be.true
      beforeAfter.destroy()
      expect($element.hasClass('pj-beforeAfter--foo')).to.be.false
    })

    it('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const beforeAfter = new BeforeAfter(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-beforeAfter--foo')).to.be.true
      expect($element.hasClass('pj-beforeAfter--bar')).to.be.true

      beforeAfter.destroy()
      expect($element.hasClass('pj-beforeAfter--foo')).to.be.false
      expect($element.hasClass('pj-beforeAfter--bar')).to.be.false
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asBeforeAfter()
      expect($element.asBeforeAfter('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asBeforeAfter()
      expect($element.asBeforeAfter('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('beforeAfter:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asBeforeAfter()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBeforeAfter()
      api = $element.data('beforeAfter')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('beforeAfter:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asBeforeAfter('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBeforeAfter()
      api = $element.data('beforeAfter')
    })

    it('should enable the plugin', () => {
      $element.asBeforeAfter('disable')
      $element.asBeforeAfter('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('beforeAfter:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asBeforeAfter('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBeforeAfter()
      api = $element.data('beforeAfter')
    })

    it('should disable the plugin', () => {
      $element.asBeforeAfter('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('beforeAfter:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asBeforeAfter('disable')
      expect(called).to.be.equal(1)
    })
  })
})
