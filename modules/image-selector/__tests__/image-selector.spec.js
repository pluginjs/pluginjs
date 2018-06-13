import ImageSelector from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ImageSelector', () => {
  describe('ImageSelector()', () => {
    test('should have ImageSelector', () => {
      expect(ImageSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImageSelector.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ImageSelector.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ImageSelector.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ImageSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample())

      expect(imageSelector).toBeObject()
      expect(imageSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample())

      expect(imageSelector.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('imageSelector:ready', () => {
        called++
      })
      const instance = ImageSelector.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
