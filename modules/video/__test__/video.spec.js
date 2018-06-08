import $ from 'jquery'
import Video from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

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
      const element = document.createElement('div')
      const video = new Video(element)

      expect(video).toBeObject()
      expect(video.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const video = new Video(element)

      expect(video.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asVideo()).toEqual($element)

      const api = $element.data('video')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asVideo()
      expect($element.asVideo('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asVideo()
      expect($element.asVideo('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('video:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asVideo()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asVideo()
      api = $element.data('video')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('video:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asVideo('destroy')

      expect(called).toEqual(1)
    })
  })
})
