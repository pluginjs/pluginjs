import ColorPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ColorPicker', () => {
  describe('ColorPicker()', () => {
    test('should have ColorPicker', () => {
      expect(ColorPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ColorPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ColorPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ColorPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ColorPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const colorPicker = ColorPicker.of(generateHTMLSample())

      expect(colorPicker).toBeObject()
      expect(colorPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const colorPicker = ColorPicker.of(generateHTMLSample())

      expect(colorPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('colorPicker:ready', () => {
        called++
      })
      const instance = ColorPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
