import BgVideo from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

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
      expect(bgVideo.options).toEqual({
        ...DEFAULTS,
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

  describe('api call', () => {
    test('should not call bind', () => {
      const instance = BgVideo.of(document.createElement('div'), {
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
      expect(instance.bind).toBeNil()
    })

    test('should call destroy', () => {
      const instance = BgVideo.of(document.createElement('div'), {
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
      expect(instance.destroy).toBeFunction()
    })
  })

  describe('initialize()', () => {
    let element

    beforeEach(() => {
      element = document.createElement('div')
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('bgVideo:ready', () => {
        called++
      })

      const api = BgVideo.of(element, {
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
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = BgVideo.of(element, {
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
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('bgVideo:destroy', () => {
        called++
      })

      api.destroy()
      expect(api.is('initialized')).toBeFalse()
      expect(called).toEqual(1)
    })
  })
})
