import Modal from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Modal', () => {
  describe('Modal()', () => {
    test('should have Modal', () => {
      expect(Modal).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Modal.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Modal.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Modal.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Modal.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const modal = new Modal()

      expect(modal).toBeObject()
      expect(modal.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const modal = new Modal()

      expect(modal.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const modal = new Modal()
      expect(modal.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = window.document.documentElement
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('modal:ready', () => {
        called++
      })
      const instance = new Modal({
        content: 'hello world'
      })
      expect(instance.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = window.document.documentElement
      api = new Modal({
        content: 'hello word'
      })
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('modal:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })
})
