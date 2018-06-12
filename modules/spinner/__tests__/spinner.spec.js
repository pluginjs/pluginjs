import Spinner from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Spinner', () => {
  describe('Spinner()', () => {
    test('should have Spinner', () => {
      expect(Spinner).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Spinner.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Spinner.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Spinner.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Spinner.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const spinner = Spinner.of(generateHTMLSample())

      expect(spinner).toBeObject()
      expect(spinner.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const spinner = Spinner.of(generateHTMLSample())

      expect(spinner.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('spinner:ready', () => {
        called++
      })
      const instance = Spinner.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
