import IconPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('IconPicker', () => {
  describe('IconPicker()', () => {
    test('should have IconPicker', () => {
      expect(IconPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(IconPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(IconPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(IconPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(IconPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const iconPicker = IconPicker.of(generateHTMLSample())

      expect(iconPicker).toBeObject()
      expect(iconPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const iconPicker = IconPicker.of(generateHTMLSample())

      expect(iconPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('iconPicker:ready', () => {
        called++
      })
      const instance = IconPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
