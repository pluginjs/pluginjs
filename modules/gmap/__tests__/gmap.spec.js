import Gmap from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
  <div class="gmap"></div>
`
const getNewGmap = () => Gmap.of(getInitialElement())
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
      const gmap = Gmap.of(getInitialElement(), {
        address: 'china',
        content: 'Fu zhou'
      })

      expect(gmap.options).toBeObject()
      expect(gmap.options.address).toEqual('china')
      expect(gmap.options.content).toEqual('Fu zhou')
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const gmap = getNewGmap()

      expect(gmap).toEqual(gmap)
      expect(gmap).toBeObject()
      expect(gmap.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      setTimeout(() => {
        const api = getNewGmap()
        expect(api.bind()).toBeNil()
      }, 0)
    })

    test('should call destroy', () => {
      const api = getNewGmap()
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

      $element.addEventListener('gmap:ready', () => {
        called++
      })

      setTimeout(() => {
        const instance = Gmap.of($element)
        expect(called).toEqual(1)
        expect(instance.is('initialized')).toBeTrue()
      }, 0)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = getNewGmap()
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
      $element = getInitialElement()
      api = getNewGmap()
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
      $element = getInitialElement()
      api = getNewGmap()
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
