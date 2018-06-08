import $ from 'jquery'
import Radio from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Radio', () => {
  describe('Radio()', () => {
    test('should have Radio', () => {
      expect(Radio).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Radio.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Radio.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Radio.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Radio.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const radio = new Radio(element)

      expect(radio).toBeObject()
      // expect(radio.options).toEqual(DEFAULTS);
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const radio = new Radio(element)

      expect(radio.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asRadio()).toEqual($element)

      const api = $element.data('radio')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const radio = new Radio(element, {
        classes: {
          label: '{namespace}-wrap',
          checked: '{namespace}-checked'
        }
      })

      expect(radio.classes.LABEL).toEqual('pj-radio-wrap')
      expect(radio.classes.CHECKED).toEqual('pj-radio-checked')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const radio = new Radio(element, {
        classes: {
          namespace: 'radio',
          label: '{namespace}-label'
        }
      })

      expect(radio.classes.NAMESPACE).toEqual('radio')
      expect(radio.classes.LABEL).toEqual('radio-label')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const radio = new Radio(element, { classes: { namespace: 'hello' } })

        expect(radio.getClass('foo')).toEqual('foo')
        expect(radio.getClass('{namespace}-foo')).toEqual('hello-foo')
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asRadio()
      expect($element.asRadio('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asRadio()
      expect($element.asRadio('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('radio:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asRadio()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRadio()
      api = $element.data('radio')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('radio:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asRadio('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRadio()
      api = $element.data('radio')
    })

    test('should enable the plugin', () => {
      $element.asRadio('disable')
      $element.asRadio('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('radio:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asRadio('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asRadio()
      api = $element.data('radio')
    })

    test('should disable the plugin', () => {
      $element.asRadio('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('radio:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asRadio('disable')
      expect(called).toEqual(1)
    })
  })
})
