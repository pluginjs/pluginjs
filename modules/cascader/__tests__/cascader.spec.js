import Cascader from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Cascader', () => {
  describe('Cascader()', () => {
    test('should have Cascader', () => {
      expect(Cascader).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Cascader.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Cascader.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Cascader.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Cascader.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const cascader = Cascader.of(generateHTMLSample())

      expect(cascader).toBeObject()
      expect(cascader.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const cascader = Cascader.of(generateHTMLSample())

      expect(cascader.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('cascader:ready', () => {
        called++
      })
      const instance = Cascader.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
