import SectionScroll from '../src/main'
import generateHTMLSample from './fixtures/sample'

describe('SectionScroll', () => {
  describe('SectionScroll()', () => {
    test('should have SectionScroll', () => {
      expect(SectionScroll).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SectionScroll.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(SectionScroll.events).toBeObject()
    })

    test('should have classes', () => {
      expect(SectionScroll.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(SectionScroll.methods).toBeArray()
    })
  })

  let $element

  beforeEach(() => {
    $element = generateHTMLSample()
    document.body.appendChild($element)
  })

  afterEach(() => {
    document.body.removeChild($element)
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const sectionScroll = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })
      expect(sectionScroll).toBeObject()
    })

    test('should have options', () => {
      const sectionScroll = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      expect(sectionScroll.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const sectionScroll = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      expect(sectionScroll.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('sectionScroll:ready', () => {
        called++
      })
      const instance = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    test('should destroy the plugin', () => {
      const api = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      const api = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      $element.addEventListener('sectionScroll:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    test('should enable the plugin', () => {
      const api = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      const api = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      $element.addEventListener('sectionScroll:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    test('should disable the plugin', () => {
      const api = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      const api = SectionScroll.of($element, {
        itemSelector: '.section',
        titleSelector: '.section-title'
      })

      $element.addEventListener('sectionScroll:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
