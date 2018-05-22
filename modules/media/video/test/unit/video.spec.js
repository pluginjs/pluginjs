import $ from 'jquery'
import Video from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Video', () => {
  describe('Video()', () => {
    it('should have Video', () => {
      expect(Video).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Video.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Video.events).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Video.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const video = new Video(element)

      expect(video).to.be.an('object')
      expect(video.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const video = new Video(element)

      expect(video.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asVideo()).to.be.equal($element)

      const api = $element.data('video')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asVideo()
      expect($element.asVideo('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asVideo()
      expect($element.asVideo('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('video:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asVideo()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asVideo()
      api = $element.data('video')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('video:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asVideo('destroy')

      expect(called).to.be.equal(1)
    })
  })
})
