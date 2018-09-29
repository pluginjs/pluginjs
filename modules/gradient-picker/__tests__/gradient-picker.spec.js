import GradientPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('GradientPicker', () => {
  describe('GradientPicker()', () => {
    test('should have GradientPicker', () => {
      expect(GradientPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GradientPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(GradientPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(GradientPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(GradientPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const gradientPicker = GradientPicker.of(generateHTMLSample())

      expect(gradientPicker).toBeObject()
      expect(gradientPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const gradientPicker = GradientPicker.of(generateHTMLSample())

      expect(gradientPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('gradientPicker:ready', () => {
        called++
      })
      const instance = GradientPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
