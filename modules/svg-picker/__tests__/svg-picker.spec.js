import SvgPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('SvgPicker', () => {
  describe('SvgPicker()', () => {
    test('should have SvgPicker', () => {
      expect(SvgPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SvgPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(SvgPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(SvgPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(SvgPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const svgpicker = SvgPicker.of(generateHTMLSample())

      expect(svgpicker).toBeObject()
      expect(svgpicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const svgpicker = SvgPicker.of(generateHTMLSample())

      expect(svgpicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('svgpicker:ready', () => {
        called++
      })
      const instance = SvgPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
