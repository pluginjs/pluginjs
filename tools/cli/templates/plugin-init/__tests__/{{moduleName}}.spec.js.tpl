import {{Namespace}} from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('{{Namespace}}', () => {
  describe('{{Namespace}}()', () => {
    test('should have {{Namespace}}', () => {
      expect({{Namespace}}).toBeFunction()
    })

    test('should have defaults', () => {
      expect({{Namespace}}.defaults).toBeObject()
    })

    test('should have events', () => {
      expect({{Namespace}}.events).toBeObject()
    })

    test('should have classes', () => {
      expect({{Namespace}}.classes).toBeObject()
    })

    test('should have methods', () => {
      expect({{Namespace}}.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const {{namespace}} = {{Namespace}}.of(generateHTMLSample())

      expect({{namespace}}).toBeObject()
      expect({{namespace}}.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const {{namespace}} = {{Namespace}}.of(generateHTMLSample())

      expect({{namespace}}.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('{{namespace}}:ready', () => {
        called++
      })
      const instance = {{Namespace}}.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
