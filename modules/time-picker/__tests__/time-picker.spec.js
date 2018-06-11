import TimePicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('TimePicker', () => {
  describe('TimePicker()', () => {
    test('should have TimePicker', () => {
      expect(TimePicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(TimePicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(TimePicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(TimePicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(TimePicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const timepicker = TimePicker.of(generateHTMLSample())

      expect(timepicker).toBeObject()
      expect(timepicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const timepicker = TimePicker.of(generateHTMLSample())

      expect(timepicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('timepicker:ready', () => {
        called++
      })
      const instance = TimePicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
