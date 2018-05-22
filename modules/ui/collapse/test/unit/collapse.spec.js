import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Collapse from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Collapse', () => {
  describe('Collapse()', () => {
    it('should have Collapse', () => {
      expect(Collapse).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Collapse.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Collapse.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Collapse.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Collapse.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element)

      expect(collapse).to.be.an('object')
      expect(collapse.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element)

      expect(collapse.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element)

      expect(collapse.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asCollapse()).to.be.equal($element)

      const api = $element.data('collapse')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(collapse.classes.CONTAINER).to.be.equal('pj-collapse-wrap')
      expect(collapse.classes.ACTIVE).to.be.equal('pj-collapse-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const collapse = new Collapse(element, {
        classes: {
          namespace: 'collapse',
          container: '{namespace}-wrap'
        }
      })

      expect(collapse.classes.NAMESPACE).to.be.equal('collapse')
      expect(collapse.classes.CONTAINER).to.be.equal('collapse-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          classes: { namespace: 'hello' }
        })

        expect(collapse.getClass('foo')).to.be.equal('foo')
        expect(collapse.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          classes: { namespace: 'hello' }
        })

        expect(collapse.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(
          collapse.getClass('{namespace}-{arg}', 'arg', 'value')
        ).to.be.equal('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(collapse.getThemeClass()).to.be.equal('')
        expect(collapse.getThemeClass('bar')).to.be.equal('pj-collapse--bar')
        expect(collapse.getThemeClass('foo bar')).to.be.equal(
          'pj-collapse--foo pj-collapse--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, {
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          }
        })

        expect(collapse.getThemeClass()).to.be.equal('')
        expect(collapse.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(collapse.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const collapse = new Collapse(element, { theme: '{namespace}--foo' })

        // set to null for test
        collapse.classes.THEME = null

        expect(collapse.getThemeClass()).to.be.equal('pj-collapse--foo')
        expect(collapse.getThemeClass('bar')).to.be.equal('bar')
        expect(collapse.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-collapse--bar'
        )
        expect(collapse.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          collapse.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-collapse--foo pj-collapse--bar')
      })
    })

    it('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const collapse = new Collapse(element, {
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-collapse--foo')).to.be.true
      collapse.destroy()
      expect($element.hasClass('pj-collapse--foo')).to.be.false
    })

    it('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const collapse = new Collapse(element, {
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect($element.hasClass('pj-collapse--foo')).to.be.true
      expect($element.hasClass('pj-collapse--bar')).to.be.true

      collapse.destroy()
      expect($element.hasClass('pj-collapse--foo')).to.be.false
      expect($element.hasClass('pj-collapse--bar')).to.be.false
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asCollapse()
      expect($element.asCollapse('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asCollapse()
      expect($element.asCollapse('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('collapse:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asCollapse()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCollapse()
      api = $element.data('collapse')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('collapse:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asCollapse('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCollapse()
      api = $element.data('collapse')
    })

    it('should enable the plugin', () => {
      $element.asCollapse('disable')
      $element.asCollapse('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('collapse:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asCollapse('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asCollapse()
      api = $element.data('collapse')
    })

    it('should disable the plugin', () => {
      $element.asCollapse('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('collapse:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asCollapse('disable')
      expect(called).to.be.equal(1)
    })
  })
})
