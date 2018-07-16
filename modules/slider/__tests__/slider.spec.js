import Slider from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Slider', () => {
  describe('Slider()', () => {
    test('should have Slider', () => {
      expect(Slider).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Slider.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Slider.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Slider.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Slider.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const slider = Slider.of(generateHTMLSample())

      expect(slider).toBeObject()
      expect(slider.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const slider = Slider.of(generateHTMLSample())

      expect(slider.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('slider:ready', () => {
        called++
      })
      const instance = Slider.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
