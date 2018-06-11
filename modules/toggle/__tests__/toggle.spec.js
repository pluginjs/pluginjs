import Toggle from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Toggle', () => {
  describe('Toggle()', () => {
    test('should have Toggle', () => {
      expect(Toggle).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Toggle.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Toggle.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Toggle.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Toggle.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const toggle = Toggle.of(generateHTMLSample())

      expect(toggle).toBeObject()
      expect(toggle.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const toggle = Toggle.of(generateHTMLSample())

      expect(toggle.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('toggle:ready', () => {
        called++
      })
      const instance = Toggle.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
