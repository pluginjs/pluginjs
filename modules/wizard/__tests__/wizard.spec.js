import Wizard from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

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
      const wizard = Wizard.of(generateHTMLSample())

      expect(wizard).toBeObject()
      expect(wizard.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const wizard = Wizard.of(generateHTMLSample())

      expect(wizard.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const wizard = Wizard.of(generateHTMLSample())
      expect(wizard.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const wizard = Wizard.of(generateHTMLSample())
      wizard.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('wizard:ready', () => {
        called++
      })

      const instance = Wizard.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Wizard.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('wizard:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Wizard.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('wizard:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Wizard.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('wizard:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
