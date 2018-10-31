import Timeline from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Timeline', () => {
  describe('Timeline()', () => {
    test('should have Timeline', () => {
      expect(Timeline).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Timeline.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Timeline.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Timeline.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Timeline.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const timeline = Timeline.of(generateHTMLSample())

      expect(timeline).toBeObject()
      expect(timeline.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const timeline = Timeline.of(generateHTMLSample())

      expect(timeline.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('timeline:ready', () => {
        called++
      })
      const instance = Timeline.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Timeline.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('timeline:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Timeline.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('timeline:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Timeline.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('timeline:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
