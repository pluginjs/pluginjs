import MultiSelect from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('MultiSelect', () => {
  describe('MultiSelect()', () => {
    test('should have MultiSelect', () => {
      expect(MultiSelect).toBeFunction()
    })

    test('should have defaults', () => {
      expect(MultiSelect.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(MultiSelect.events).toBeObject()
    })

    test('should have classes', () => {
      expect(MultiSelect.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(MultiSelect.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const multiSelect = MultiSelect.of(generateHTMLSample())

      expect(multiSelect).toBeObject()
      expect(multiSelect.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const multiSelect = MultiSelect.of(generateHTMLSample())

      expect(multiSelect.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('multiSelect:ready', () => {
        called++
      })
      const instance = MultiSelect.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
