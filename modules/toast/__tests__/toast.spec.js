import Toast from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Toast', () => {
  describe('Toast()', () => {
    test('should have Toast', () => {
      expect(Toast).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Toast.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Toast.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Toast.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Toast.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const toast = new Toast()

      expect(toast).toBeObject()
      expect(toast.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const toast = new Toast()

      expect(toast.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const toast = new Toast()
      expect(toast.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = window.document.documentElement
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('toast:ready', () => {
        called++
      })
      const instance = new Toast()
      expect(instance.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = window.document.documentElement
      api = new Toast()
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('toast:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })
})
