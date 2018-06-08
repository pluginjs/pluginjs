import FontPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('FontPicker', () => {
  describe('FontPicker()', () => {
    test('should have FontPicker', () => {
      expect(FontPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(FontPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(FontPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(FontPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(FontPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const fontPicker = FontPicker.of(generateHTMLSample())

      expect(fontPicker).toBeObject()
      expect(fontPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const fontPicker = FontPicker.of(generateHTMLSample())

      expect(fontPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('fontPicker:ready', () => {
        called++
      })
      const instance = FontPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
