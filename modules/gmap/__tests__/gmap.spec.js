import Gmap from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const getNewGmap = () => Gmap.of(generateHTMLSample())
describe('Gmap', () => {
  describe('Gmap()', () => {
    test('should have Gmap', () => {
      expect(Gmap).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Gmap.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Gmap.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Gmap.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Gmap.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const gmap = getNewGmap()

      expect(gmap).toBeObject()
      expect(gmap.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const gmap = Gmap.of(generateHTMLSample(), {
        address: 'china',
        content: 'Fu zhou'
      })

      expect(gmap.options).toBeObject()
      expect(gmap.options.address).toEqual('china')
      expect(gmap.options.content).toEqual('Fu zhou')
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('gmap:ready', () => {
        called++
      })

      const instance = Gmap.of($element)

      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Gmap.of($element)
    })

    test('should destroy the plugin', () => {
      setTimeout(() => {
        expect(api.is('initialized')).toBeTrue()

        api.destroy()

        expect(api.is('initialized')).toBeFalse()
      }, 0)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('gmap:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      setTimeout(() => {
        api.destroy()

        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Gmap.of($element)
    })

    test('should enable the plugin', () => {
      setTimeout(() => {
        api.disanle()
        api.enable()
      }, 0)

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('gmap:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      setTimeout(() => {
        api.enable()
        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Gmap.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('gmap:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      setTimeout(() => {
        api.disable()
        expect(called).toEqual(1)
      }, 0)
    })
  })
})
