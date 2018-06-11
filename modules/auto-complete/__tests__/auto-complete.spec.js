import AutoComplete from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('AutoComplete', () => {
  describe('AutoComplete()', () => {
    test('should have AutoComplete', () => {
      expect(AutoComplete).toBeFunction()
    })

    test('should have defaults', () => {
      expect(AutoComplete.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(AutoComplete.events).toBeObject()
    })

    test('should have classes', () => {
      expect(AutoComplete.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(AutoComplete.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const autoComplete = AutoComplete.of(generateHTMLSample())

      expect(autoComplete).toBeObject()
      expect(autoComplete.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const autoComplete = AutoComplete.of(generateHTMLSample())

      expect(autoComplete.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('autoComplete:ready', () => {
        called++
      })
      const instance = AutoComplete.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
