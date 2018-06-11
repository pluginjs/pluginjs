import BgPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('BgPicker', () => {
  describe('BgPicker()', () => {
    test('should have BgPicker', () => {
      expect(BgPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(BgPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(BgPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(BgPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(BgPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const bgPicker = BgPicker.of(generateHTMLSample())

      expect(bgPicker).toBeObject()
      expect(bgPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const bgPicker = BgPicker.of(generateHTMLSample())

      expect(bgPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('bgPicker:ready', () => {
        called++
      })
      const instance = BgPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
