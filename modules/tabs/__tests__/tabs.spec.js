import Tabs from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Tabs', () => {
  describe('Tabs()', () => {
    test('should have Tabs', () => {
      expect(Tabs).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tabs.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tabs.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tabs.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tabs.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const tabs = Tabs.of(generateHTMLSample())

      expect(tabs).toBeObject()
      expect(tabs.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const tabs = Tabs.of(generateHTMLSample())

      expect(tabs.options).toBeObject()
    })
  })

  describe('initialize()', () => {
    let element

    beforeEach(() => {
      element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('tabs:ready', () => {
        called++
      })

      const tabs = Tabs.of(element)

      expect(called).toEqual(1)
      expect(tabs.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let element
    let tabs

    beforeEach(() => {
      element = generateHTMLSample()
      tabs = Tabs.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('tabs:destroy', () => {
        expect(tabs.is('initialized')).toBeFalse()
        called++
      })

      tabs.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let element
    let tabs

    beforeEach(() => {
      element = generateHTMLSample()
      tabs = Tabs.of(element)
    })

    test('should enable the plugin', () => {
      tabs.disabled()
      expect(tabs.is('disabled')).toBeTrue()

      tabs.enable()
      expect(tabs.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('tabs:enable', () => {
        expect(tabs.is('disabled')).toBeFalse()
        called++
      })

      tabs.enable()

      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let element
    let tabs

    beforeEach(() => {
      element = generateHTMLSample()
      tabs = Tabs.of(element)
    })

    test('should disable the plugin', () => {
      tabs.disabled()
      expect(tabs.is('disabled')).toBeTrue()
    })

    test('should trigger disabled event', () => {
      let called = 0

      element.addEventListener('tabs:disabled', () => {
        expect(tabs.is('disabled')).toBeTrue()
        called++
      })

      tabs.disabled()

      expect(called).toEqual(1)
    })
  })
})
