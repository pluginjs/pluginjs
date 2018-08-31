import Loader from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
<div class="pj-loader">
  <a class="pj-loader pj-loader-prev" href="javascript:void(0);" alt="Previous">
    <i class="pj-loader-icon pj-icon pj-icon-chevron-left"></i>
  </a>
  <a class="pj-loader pj-loader-next" href="javascript:void(0);" alt="Next">
    <i class="pj-loader-icon pj-icon pj-icon-chevron-right"></i>
  </a>
</div>
`

describe('Loader', () => {
  describe('Loader()', () => {
    test('should have Loader', () => {
      expect(Loader).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Loader.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Loader.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Loader.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Loader.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const loader = Loader.of(getInitialElement())

      expect(loader).toBeObject()
      expect(loader.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const loader = Loader.of(getInitialElement())

      expect(loader.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const loader = Loader.of(getInitialElement())
      expect(loader.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const loader = Loader.of(getInitialElement())
      loader.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getInitialElement()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('loader:ready', () => {
        called++
      })
      const instance = Loader.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = Loader.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('loader:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = Loader.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('loader:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = Loader.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('loader:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
