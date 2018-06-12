import DatePicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('DatePicker', () => {
  describe('DatePicker()', () => {
    test('should have DatePicker', () => {
      expect(DatePicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(DatePicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(DatePicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(DatePicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(DatePicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const datePicker = DatePicker.of(generateHTMLSample())

      expect(datePicker).toBeObject()
      expect(datePicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const datePicker = DatePicker.of(generateHTMLSample())

      expect(datePicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('datePicker:ready', () => {
        called++
      })
      const instance = DatePicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
