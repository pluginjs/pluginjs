import FloatingMenu from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('FloatingMenu', () => {
  describe('FloatingMenu()', () => {
    test('should have FloatingMenu', () => {
      expect(FloatingMenu).toBeFunction()
    })

    test('should have defaults', () => {
      expect(FloatingMenu.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(FloatingMenu.events).toBeObject()
    })

    test('should have classes', () => {
      expect(FloatingMenu.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(FloatingMenu.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const floatingMenu = FloatingMenu.of(generateHTMLSample())

      expect(floatingMenu).toBeObject()
      expect(floatingMenu.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const floatingMenu = FloatingMenu.of(generateHTMLSample())

      expect(floatingMenu.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('floatingMenu:ready', () => {
        called++
      })
      const instance = FloatingMenu.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
