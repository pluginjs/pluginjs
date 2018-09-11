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
      const modal = new Modal({
        content: 'hello world'
      })

      expect(modal).toBeObject()
      expect(modal.options).toEqual({
        ...DEFAULTS,
        content: 'hello world'
      })
    })

    test('should have options', () => {
      const modal = new Modal({
        content: 'hello world'
      })

      expect(modal.options).toBeObject()
    })

    test('should have classes', () => {
      const modal = new Modal({
        content: 'hello world'
      })

      expect(modal.classes).toBeObject()
    })
  })

  describe('initialize()', () => {
    const $doc = window.document.documentElement

    test('should trigger ready event', () => {
      let called = 0
      $doc.addEventListener('modal:ready', function handler() {
        called++
        $doc.removeEventListener('modal:ready', handler)
      })
      const api = new Modal({
        content: 'hello world'
      })
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    const api = new Modal({
      content: 'hello world'
    })
    const $doc = window.document.documentElement

    test('should trigger destroy event', () => {
      let called = 0
      $doc.addEventListener('modal:destroy', function handler() {
        called++
        $doc.removeEventListener('modal:ready', handler)
      })

      api.destroy()
      expect(called).toEqual(1)
    })
  })
})
