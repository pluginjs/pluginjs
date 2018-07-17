import Gallery from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Gallery', () => {
  describe('Gallery()', () => {
    test('should have Gallery', () => {
      expect(Gallery).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Gallery.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Gallery.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Gallery.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Gallery.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const gallery = Gallery.of(generateHTMLSample())

      expect(gallery).toBeObject()
      expect(gallery.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const gallery = Gallery.of(generateHTMLSample())

      expect(gallery.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('gallery:ready', () => {
        called++
      })
      const instance = Gallery.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
