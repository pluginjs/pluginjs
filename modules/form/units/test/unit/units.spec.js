import $ from 'jquery'
import '@pluginjs/dropdown'
import Units from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = ['px', '%']
describe('Units', () => {
  describe('Units()', () => {
    it('should have Units', () => {
      expect(Units).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Units.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Units.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Units.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Units.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const units = new Units(element, { data })

      expect(units).to.be.an('object')
      expect(units.options).to.be.eql({
        ...DEFAULTS,
        data
      })
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const units = new Units(element, { data })

      expect(units.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const units = new Units(element, { data })

      expect(units.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asUnits({ data })).to.be.equal($element)

      const api = $element.data('units')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const units = new Units(element, {
        data,
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        },
        data
      })

      expect(units.classes.CONTAINER).to.be.equal('pj-units-wrap')
      expect(units.classes.ACTIVE).to.be.equal('pj-units-active')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const units = new Units(element, {
        data,
        classes: {
          namespace: 'units',
          container: '{namespace}-wrap'
        },
        data
      })

      expect(units.classes.NAMESPACE).to.be.equal('units')
      expect(units.classes.CONTAINER).to.be.equal('units-wrap')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(units.getClass('foo')).to.be.equal('foo')
        expect(units.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })

      it('should get class with arg', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(units.getClass('foo', 'arg', 'value')).to.be.equal('foo')
        expect(units.getClass('{namespace}-{arg}', 'arg', 'value')).to.be.equal(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      it('should get theme classes with default namespace', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(units.getThemeClass()).to.be.equal('')
        expect(units.getThemeClass('bar')).to.be.equal('pj-units--bar')
        expect(units.getThemeClass('foo bar')).to.be.equal(
          'pj-units--foo pj-units--bar'
        )
      })

      it('should get theme classes with namespace override', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          },
          data
        })

        expect(units.getThemeClass()).to.be.equal('')
        expect(units.getThemeClass('bar')).to.be.equal('hello--bar')
        expect(units.getThemeClass('foo bar')).to.be.equal(
          'hello--foo hello--bar'
        )
      })

      it('should get theme classes correctly when no classes.THEME defined', () => {
        const element = document.createElement('div')
        const units = new Units(element, {
          data,
          theme: '{namespace}--foo'
        })

        // set to null for test
        units.classes.THEME = null

        expect(units.getThemeClass()).to.be.equal('pj-units--foo')
        expect(units.getThemeClass('bar')).to.be.equal('bar')
        expect(units.getThemeClass('{namespace}--bar')).to.be.equal(
          'pj-units--bar'
        )
        expect(units.getThemeClass('foo bar')).to.be.equal('foo bar')
        expect(
          units.getThemeClass('{namespace}--foo {namespace}--bar')
        ).to.be.equal('pj-units--foo pj-units--bar')
      })
    })

    it('should add theme class after initialize and remove after destroy', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const units = new Units(element, {
        data,
        theme: 'foo',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect(units.$wrap.hasClass('pj-units--foo')).to.be.true
      units.destroy()
      expect(units.$wrap.hasClass('pj-units--foo')).to.be.false
    })

    it('should works with more than one theme', () => {
      const element = document.createElement('div')
      const $element = $(element)
      const units = new Units(element, {
        data,
        theme: 'foo bar',
        classes: { theme: '{namespace}--{theme}' }
      })

      expect(units.$wrap.hasClass('pj-units--foo')).to.be.true
      expect(units.$wrap.hasClass('pj-units--bar')).to.be.true
      units.destroy()
      expect(units.$wrap.hasClass('pj-units--foo')).to.be.false
      expect(units.$wrap.hasClass('pj-units--bar')).to.be.false
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asUnits({ data })
      expect($element.asUnits('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asUnits({ data })
      expect($element.asUnits('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('units:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asUnits({ data })
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asUnits({ data })
      api = $element.data('units')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('units:destroy', (event, api) => {
        console.log('11111111111')
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asUnits('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asUnits({ data })
      api = $element.data('units')
    })

    it('should enable the plugin', () => {
      $element.asUnits('disable')
      $element.asUnits('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('units:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asUnits('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asUnits({ data })
      api = $element.data('units')
    })

    it('should disable the plugin', () => {
      $element.asUnits('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('units:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asUnits('disable')
      expect(called).to.be.equal(1)
    })
  })
})
