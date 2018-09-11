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
      const dots = Accordion.of(generateHTMLSample())
      expect(dots.bind()).toBeNil()
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
})
