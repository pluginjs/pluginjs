import Checkbox from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Checkbox', () => {
  describe('Checkbox()', () => {
    test('should have Checkbox', () => {
      expect(Checkbox).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Checkbox.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Checkbox.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Checkbox.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Checkbox.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const checkbox = Checkbox.of(generateHTMLSample())

      expect(checkbox).toBeObject()
      expect(checkbox.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const checkbox = Checkbox.of(generateHTMLSample())

      expect(checkbox.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('checkbox:ready', () => {
        called++
      })
      const instance = Checkbox.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
