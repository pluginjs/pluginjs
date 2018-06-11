import Dropdown from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Dropdown', () => {
  describe('Dropdown()', () => {
    test('should have Dropdown', () => {
      expect(Dropdown).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Dropdown.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Dropdown.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Dropdown.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Dropdown.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const dropdown = Dropdown.of(generateHTMLSample())

      expect(dropdown).toBeObject()
      expect(dropdown.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const dropdown = Dropdown.of(generateHTMLSample())

      expect(dropdown.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('dropdown:ready', () => {
        called++
      })
      const instance = Dropdown.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
