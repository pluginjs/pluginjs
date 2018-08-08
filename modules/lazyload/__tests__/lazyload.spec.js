import Lazyload from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'
import 'intersection-observer'

const html =
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
      const element = parseHTML(html)
      const lazyload = new Lazyload(element)

      expect(lazyload.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = parseHTML(html)
      const lazyload = new Lazyload(element)

      expect(lazyload.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = parseHTML(html)
      const lazyload = new Lazyload(element)

      expect(lazyload.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element
    let api

    beforeEach(() => {
      element = parseHTML(html)
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('lazyload:ready', () => {
        called++
      })

      api = Lazyload.of(element)

      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = parseHTML(html)
      api = Lazyload.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('lazyload:destroy', () => {
        called++
      })

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let element
    let api

    beforeEach(() => {
      element = parseHTML(html)
      api = Lazyload.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('lazyload:enable', () => {
        called++
      })

      api.enable()
      expect(api.is('disabled')).toBeFalse()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let element
    let api

    beforeEach(() => {
      element = parseHTML(html)
      api = Lazyload.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('lazyload:disable', () => {
        called++
      })

      api.disable()

      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
