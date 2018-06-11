import ToggleList from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ToggleList', () => {
  describe('ToggleList()', () => {
    test('should have ToggleList', () => {
      expect(ToggleList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ToggleList.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ToggleList.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ToggleList.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ToggleList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const togglelist = ToggleList.of(generateHTMLSample())

      expect(togglelist).toBeObject()
      expect(togglelist.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const togglelist = ToggleList.of(generateHTMLSample())

      expect(togglelist.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('togglelist:ready', () => {
        called++
      })
      const instance = ToggleList.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
