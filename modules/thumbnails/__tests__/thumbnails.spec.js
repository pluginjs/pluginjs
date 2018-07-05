import Thumbnails from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Thumbnails', () => {
  describe('Thumbnails()', () => {
    test('should have Thumbnails', () => {
      expect(Thumbnails).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Thumbnails.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Thumbnails.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Thumbnails.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Thumbnails.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const thumbnails = Thumbnails.of(generateHTMLSample())

      expect(thumbnails).toBeObject()
      expect(thumbnails.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const thumbnails = Thumbnails.of(generateHTMLSample())

      expect(thumbnails.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('thumbnails:ready', () => {
        called++
      })
      const instance = Thumbnails.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
