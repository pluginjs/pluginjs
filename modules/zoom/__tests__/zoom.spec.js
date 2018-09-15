import Zoom from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Zoom', () => {
  describe('Zoom()', () => {
    test('should have Zoom', () => {
      expect(Zoom).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Zoom.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Zoom.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Zoom.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Zoom.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const zoom = Zoom.of(generateHTMLSample())

      expect(zoom).toBeObject()
      expect(zoom.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const zoom = Zoom.of(generateHTMLSample())

      expect(zoom.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('zoom:ready', () => {
        called++
      })
      const instance = Zoom.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
