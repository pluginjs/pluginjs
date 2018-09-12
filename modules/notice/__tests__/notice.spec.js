import Notice from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Notice', () => {
  describe('Notice()', () => {
    test('should have Notice', () => {
      expect(Notice).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Notice.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Notice.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Notice.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Notice.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work correctly', () => {
      const notice = new Notice()

      expect(notice).toBeObject()
      expect(notice.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const notice = new Notice()

      expect(notice.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const notice = new Notice()
      expect(notice.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = window.document.documentElement
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('notice:ready', () => {
        called++
      })
      const instance = new Notice({
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
      api = new Notice({
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

      $element.addEventListener('notice:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })
})
