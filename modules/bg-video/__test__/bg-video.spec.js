import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import BgVideo from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/video'

const options = {
  type: 'html5',
  url: 'http://vjs.zencdn.net/v/oceans.mp4',
  id: ''
}

describe('BgVideo', () => {
  describe('BgVideo()', () => {
    test('should have BgVideo', () => {
      expect(BgVideo).toBeFunction()
    })

    test('should have defaults', () => {
      expect(BgVideo.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(BgVideo.events).toBeObject()
    })

    test('should have methods', () => {
      expect(BgVideo.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const bgVideo = new BgVideo(element, {
        type: options.type,
        video: {
          url: options.url,
          id: options.id,
          repeat: true,
          mute: true,
          autoplay: true,
          mobileImage: ''
        }
      })

      expect(bgVideo).toBeObject()
      // expect(bgVideo.options).toEqual(DEFAULTS);
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const bgVideo = new BgVideo(element, {
        type: options.type,
        video: {
          url: options.url,
          id: options.id,
          repeat: true,
          mute: true,
          autoplay: true,
          mobileImage: ''
        }
      })

      expect(bgVideo.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect(
        $element.asBgVideo({
          type: options.type,
          video: {
            url: options.url,
            id: options.id,
            repeat: true,
            mute: true,
            autoplay: true,
            mobileImage: ''
          }
        })
      ).toEqual($element)

      const api = $element.data('bgVideo')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asBgVideo({
        type: options.type,
        video: {
          url: options.url,
          id: options.id,
          repeat: true,
          mute: true,
          autoplay: true,
          mobileImage: ''
        }
      })
      expect($element.asBgVideo('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asBgVideo({
        type: options.type,
        video: {
          url: options.url,
          id: options.id,
          repeat: true,
          mute: true,
          autoplay: true,
          mobileImage: ''
        }
      })
      expect($element.asBgVideo('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('bgVideo:ready', (event, api) => {
        // expect(api.is('initialized')).toBeTrue();
        called++
      })

      $element.asBgVideo({
        type: options.type,
        video: {
          url: options.url,
          id: options.id,
          repeat: true,
          mute: true,
          autoplay: true,
          mobileImage: ''
        }
      })
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asBgVideo({
        type: options.type,
        video: {
          url: options.url,
          id: options.id,
          repeat: true,
          mute: true,
          autoplay: true,
          mobileImage: ''
        }
      })
      api = $element.data('bgVideo')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('bgVideo:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asBgVideo('destroy')

      expect(called).toEqual(1)
    })
  })
})
