import List from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('List', () => {
  describe('List()', () => {
    test('should have List', () => {
      expect(List).toBeFunction()
    })

    test('should have defaults', () => {
      expect(List.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(List.events).toBeObject()
    })

    test('should have classes', () => {
      expect(List.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(List.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const list = List.of(generateHTMLSample())

      expect(list).toBeObject()
      expect(list.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const list = List.of(generateHTMLSample())

      expect(list.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('list:ready', () => {
        called++
      })
      const instance = List.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
