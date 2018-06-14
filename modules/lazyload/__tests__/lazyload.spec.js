import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Lazyload from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const testStr =
  '<img class="img-shell" lazyload data-src="http://oqcgupxln.bkt.clouddn.com/61295983_p0.png?imageView2/1/w/400/h/400" alt="" />'
describe('Lazyload', () => {
  describe('Lazyload()', () => {
    test('should have Lazyload', () => {
      expect(Lazyload).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Lazyload.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Lazyload.events).toBeObject()
    })
    test('should have methods', () => {
      expect(Lazyload.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const lazyload = new Lazyload(element)

      expect(lazyload).toBeObject()
      expect(lazyload.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const lazyload = new Lazyload(element)

      expect(lazyload.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const container = document.createElement('div')
      container.innerHTML = testStr
      const $element = $(container).find('[lazyload]')

      expect($element.asLazyload()).toEqual($element)

      const api = $element.data('lazyload')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asLazyload()
      expect($element.asLazyload('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asLazyload()
      $element.asLazyload('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('lazyload:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asLazyload()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLazyload()
      api = $element.data('lazyload')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('lazyload:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asLazyload('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLazyload()
      api = $element.data('lazyload')
    })

    test('should enable the plugin', () => {
      $element.asLazyload('disable')
      $element.asLazyload('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('lazyload:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asLazyload('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asLazyload()
      api = $element.data('lazyload')
    })

    test('should disable the plugin', () => {
      $element.asLazyload('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('lazyload:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asLazyload('disable')
      expect(called).toEqual(1)
    })
  })
})
