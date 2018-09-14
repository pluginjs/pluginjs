import Accordion from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Accordion', () => {
  describe('Accordion()', () => {
    test('should have Accordion', () => {
      expect(Accordion).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Accordion.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Accordion.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Accordion.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Accordion.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const accordion = Accordion.of(generateHTMLSample())

      expect(accordion).toBeObject()
      expect(accordion.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const accordion = Accordion.of(generateHTMLSample())

      expect(accordion.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const accordion = Accordion.of(generateHTMLSample())
      expect(accordion.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('accordion:ready', () => {
        called++
      })

      const instance = Accordion.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Accordion.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('accordion:destroy', () => {
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
      api = Accordion.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('accordion:enable', () => {
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
      api = Accordion.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('accordion:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
