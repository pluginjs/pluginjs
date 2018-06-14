import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Wizard from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Wizard', () => {
  describe('Wizard()', () => {
    test('should have Wizard', () => {
      expect(Wizard).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Wizard.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Wizard.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Wizard.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Wizard.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const wizard = new Wizard(element)

      expect(wizard).toBeObject()
      expect(wizard.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const wizard = new Wizard(element)

      expect(wizard.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asWizard()).toEqual($element)

      const api = $element.data('wizard')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asWizard()
      expect($element.asWizard('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asWizard()
      expect($element.asWizard('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('wizard:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asWizard()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asWizard()
      api = $element.data('wizard')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('wizard:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asWizard('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asWizard()
      api = $element.data('wizard')
    })

    test('should enable the plugin', () => {
      $element.asWizard('disable')
      $element.asWizard('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('wizard:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asWizard('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asWizard()
      api = $element.data('wizard')
    })

    test('should disable the plugin', () => {
      $element.asWizard('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('wizard:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asWizard('disable')
      expect(called).toEqual(1)
    })
  })
})
