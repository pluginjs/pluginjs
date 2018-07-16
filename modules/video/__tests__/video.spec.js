import Video from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Video', () => {
  describe('Video()', () => {
    test('should have Video', () => {
      expect(Video).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Video.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Video.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Video.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const video = Video.of(generateHTMLSample())

      expect(video).toBeObject()
      expect(video.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const video = Video.of(generateHTMLSample())

      expect(video.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should call destroy', () => {
      const video = Video.of(generateHTMLSample())
      expect(video.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element

    beforeEach(() => {
      element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('video:ready', () => {
        called++
      })

      const api = Video.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = generateHTMLSample()
      api = Video.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('video:destroy', () => {
        called++
      })

      api.destroy()
      expect(api.is('initialized')).toBeFalse()
      expect(called).toEqual(1)
    })
  })
})
