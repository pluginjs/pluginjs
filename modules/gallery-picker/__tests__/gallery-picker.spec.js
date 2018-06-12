import GalleryPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('GalleryPicker', () => {
  describe('GalleryPicker()', () => {
    test('should have GalleryPicker', () => {
      expect(GalleryPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GalleryPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(GalleryPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(GalleryPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(GalleryPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const galleryPicker = GalleryPicker.of(generateHTMLSample())

      expect(galleryPicker).toBeObject()
      expect(galleryPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const galleryPicker = GalleryPicker.of(generateHTMLSample())

      expect(galleryPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('galleryPicker:ready', () => {
        called++
      })
      const instance = GalleryPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
