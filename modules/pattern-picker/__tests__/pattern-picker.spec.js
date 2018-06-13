import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import PatternPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('PatternPicker', () => {
  describe('PatternPicker()', () => {
    test('should have PatternPicker', () => {
      expect(PatternPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PatternPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(PatternPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(PatternPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(PatternPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const patternpicker = PatternPicker.of(generateHTMLSample())

      expect(patternpicker).toBeObject()
      expect(patternpicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const patternpicker = PatternPicker.of(generateHTMLSample())

      expect(patternpicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('patternpicker:ready', () => {
        called++
      })
      const instance = PatternPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
