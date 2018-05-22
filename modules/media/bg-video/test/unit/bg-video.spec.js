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
    it('should have BgVideo', () => {
      expect(BgVideo).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(BgVideo.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(BgVideo.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(BgVideo.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
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

      expect(bgVideo).to.be.an('object')
      // expect(bgVideo.options).to.be.eql(DEFAULTS);
    })

    it('should have options', () => {
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

      expect(bgVideo.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
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
      ).to.be.equal($element)

      const api = $element.data('bgVideo')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
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
      expect($element.asBgVideo('bind')).to.be.undefined
    })

    it('should call destroy', () => {
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
      expect($element.asBgVideo('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('bgVideo:ready', (event, api) => {
        // expect(api.is('initialized')).to.be.true;
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
      expect(called).to.be.equal(1)
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

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('bgVideo:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asBgVideo('destroy')

      expect(called).to.be.equal(1)
    })
  })
})
