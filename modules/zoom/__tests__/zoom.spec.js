import Zoom from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
  <img class="zoom" src="https://picsum.photos/420/280?image=0"/>
`

const getNewZoom = () => Zoom.of(getInitialElement())

describe('Zoom', () => {
  describe('Zoom()', () => {
    test('should have Zoom', () => {
      expect(Zoom).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Zoom.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Zoom.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Zoom.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Zoom.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const api = getNewZoom()

      expect(api).toBeObject()
      expect(api.options).toEqual({
        ...DEFAULTS
      })
    })

    test('should have options', () => {
      const zoom = getNewZoom()

      expect(zoom.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const api = getNewZoom()

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const api = getNewZoom()
      expect(api.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const api = getNewZoom()
      api.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getInitialElement()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('zoom:ready', () => {
        called++
      })

      const instance = Zoom.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = Zoom.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('zoom:destroy', () => {
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
      api = Zoom.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('zoom:enable', () => {
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
      api = Zoom.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('zoom:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
