import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Progress from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Progress', () => {
  describe('Progress()', () => {
    it('should have Progress', () => {
      expect(Progress).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Progress.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Progress.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Progress.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Progress.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const progress = new Progress(element)

      expect(progress).to.be.an('object')
      expect(progress.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const progress = new Progress(element)

      expect(progress.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asProgress()).to.be.equal($element)

      const api = $element.data('progress')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asProgress()
      expect($element.asProgress('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asProgress()
      expect($element.asProgress('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('progress:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asProgress()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asProgress()
      api = $element.data('progress')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('progress:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asProgress('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asProgress()
      api = $element.data('progress')
    })

    it('should enable the plugin', () => {
      $element.asProgress('disable')
      $element.asProgress('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('progress:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asProgress('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asProgress()
      api = $element.data('progress')
    })

    it('should disable the plugin', () => {
      $element.asProgress('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('progress:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asProgress('disable')
      expect(called).to.be.equal(1)
    })
  })
})
