import Choice from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Choice', () => {
  describe('Choice()', () => {
    test('should have Choice', () => {
      expect(Choice).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Choice.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Choice.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Choice.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Choice.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const choice = Choice.of(generateHTMLSample())

      expect(choice).toBeObject()
      expect(choice.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const choice = Choice.of(generateHTMLSample())

      expect(choice.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('choice:ready', () => {
        called++
      })
      const instance = Choice.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
