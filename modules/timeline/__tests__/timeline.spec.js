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
})
