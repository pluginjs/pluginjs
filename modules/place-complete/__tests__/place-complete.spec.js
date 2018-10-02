import PlaceComplete from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('PlaceComplete', () => {
  describe('PlaceComplete()', () => {
    test('should have PlaceComplete', () => {
      expect(PlaceComplete).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PlaceComplete.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(PlaceComplete.events).toBeObject()
    })

    test('should have classes', () => {
      expect(PlaceComplete.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(PlaceComplete.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const placeComplete = PlaceComplete.of(generateHTMLSample())

      expect(placeComplete).toBeObject()
      expect(placeComplete.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const placeComplete = PlaceComplete.of(generateHTMLSample())

      expect(placeComplete.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('placeComplete:ready', () => {
        called++
      })
      const instance = PlaceComplete.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
