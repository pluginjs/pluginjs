import Swipeable from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Swipeable', () => {
  describe('Swipeable()', () => {
    test('should have Swipeable', () => {
      expect(Swipeable).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Swipeable.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Swipeable.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Swipeable.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Swipeable.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const swipeable = Swipeable.of(generateHTMLSample())

      expect(swipeable).toBeObject()
      expect(swipeable.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const swipeable = Swipeable.of(generateHTMLSample())

      expect(swipeable.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('swipeable:ready', () => {
        called++
      })
      const instance = Swipeable.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
