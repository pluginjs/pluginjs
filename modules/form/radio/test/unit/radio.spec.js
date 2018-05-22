import $ from 'jquery'
import Radio from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Radio', () => {
  describe('Radio()', () => {
    it('should have Radio', () => {
      expect(Radio).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Radio.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Radio.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Radio.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Radio.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const radio = new Radio(element)

      expect(radio).to.be.an('object')
      // expect(radio.options).to.be.eql(DEFAULTS);
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const radio = new Radio(element)

      expect(radio.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asRadio()).to.be.equal($element)

      const api = $element.data('radio')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('classes', () => {
    it('should use classes options', () => {
      const element = document.createElement('div')
      const radio = new Radio(element, {
        classes: {
          label: '{namespace}-wrap',
          checked: '{namespace}-checked'
        }
      })

      expect(radio.classes.LABEL).to.be.equal('pj-radio-wrap')
      expect(radio.classes.CHECKED).to.be.equal('pj-radio-checked')
    })

    it('should override class namespace', () => {
      const element = document.createElement('div')
      const radio = new Radio(element, {
        classes: {
          namespace: 'radio',
          label: '{namespace}-label'
        }
      })

      expect(radio.classes.NAMESPACE).to.be.equal('radio')
      expect(radio.classes.LABEL).to.be.equal('radio-label')
    })

    describe('getClass()', () => {
      it('should get class with namespace', () => {
        const element = document.createElement('div')
        const radio = new Radio(element, { classes: { namespace: 'hello' } })

        expect(radio.getClass('foo')).to.be.equal('foo')
        expect(radio.getClass('{namespace}-foo')).to.be.equal('hello-foo')
      })
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asRadio()
      expect($element.asRadio('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asRadio()
      expect($element.asRadio('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('radio:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asRadio()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRadio()
      api = $element.data('radio')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('radio:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asRadio('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRadio()
      api = $element.data('radio')
    })

    it('should enable the plugin', () => {
      $element.asRadio('disable')
      $element.asRadio('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('radio:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asRadio('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRadio()
      api = $element.data('radio')
    })

    it('should disable the plugin', () => {
      $element.asRadio('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('radio:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asRadio('disable')
      expect(called).to.be.equal(1)
    })
  })
})
