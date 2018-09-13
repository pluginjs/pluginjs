import Rate from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const getNewRate = () => Rate.of(generateHTMLSample())

describe('Rate', () => {
  describe('Rate()', () => {
    test('should have Rate', () => {
      expect(Rate).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Rate.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Rate.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Rate.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Rate.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const rate = getNewRate()

      expect(rate).toBeObject()
      expect(rate.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const rate = getNewRate()

      expect(rate.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const rate = getNewRate()
      expect(rate.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('rate:ready', () => {
        called++
      })

      const instance = Rate.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Rate.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('rate:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })
})
