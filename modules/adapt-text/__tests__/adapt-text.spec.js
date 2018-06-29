import AdaptText from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('AdaptText', () => {
  describe('AdaptText()', () => {
    test('should have AdaptText', () => {
      expect(AdaptText).toBeFunction()
    })

    test('should have defaults', () => {
      expect(AdaptText.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(AdaptText.events).toBeObject()
    })

    test('should have methods', () => {
      expect(AdaptText.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const adaptText = AdaptText.of(element)

      expect(adaptText).toBeObject()
      expect(adaptText.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const adaptText = AdaptText.of(element, {
        ratio: 20,
        scrollable: true
      })

      expect(adaptText.options).toBeObject()
      expect(adaptText.options.ratio).toEqual(20)
      expect(adaptText.options.scrollable).toEqual(true)
      expect(adaptText.options.ratio).toBeNumber()
    })
  })

  describe('initialized()', () => {
    let element

    beforeEach(() => {
      element = document.createElement('div')
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('adaptText:ready', () => {
        called++
      })

      const api = AdaptText.of(element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('enable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = AdaptText.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('adaptText:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = AdaptText.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('adaptText:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
