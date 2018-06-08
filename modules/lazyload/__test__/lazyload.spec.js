import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Lazyload from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const testStr =
  '<img class="img-shell" lazyload data-src="http://oqcgupxln.bkt.clouddn.com/61295983_p0.png?imageView2/1/w/400/h/400" alt="" />'
describe('Lazyload', () => {
  describe('Lazyload()', () => {
    it('should have Lazyload', () => {
      expect(Lazyload).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Lazyload.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Lazyload.events).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Lazyload.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const lazyload = new Lazyload(element)

      expect(lazyload).to.be.an('object')
      expect(lazyload.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const lazyload = new Lazyload(element)

      expect(lazyload.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const container = document.createElement('div')
      container.innerHTML = testStr
      const $element = $(container).find('[lazyload]')

      expect($element.asLazyload()).to.be.equal($element)

      const api = $element.data('lazyload')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asLazyload()
      expect($element.asLazyload('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asLazyload()
      $element.asLazyload('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('lazyload:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asLazyload()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLazyload()
      api = $element.data('lazyload')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('lazyload:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asLazyload('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLazyload()
      api = $element.data('lazyload')
    })

    it('should enable the plugin', () => {
      $element.asLazyload('disable')
      $element.asLazyload('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('lazyload:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asLazyload('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLazyload()
      api = $element.data('lazyload')
    })

    it('should disable the plugin', () => {
      $element.asLazyload('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('lazyload:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asLazyload('disable')
      expect(called).to.be.equal(1)
    })
  })
})
