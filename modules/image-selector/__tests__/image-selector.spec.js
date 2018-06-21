import ImageSelector from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ImageSelector', () => {
  describe('ImageSelector()', () => {
    test('should have ImageSelector', () => {
      expect(ImageSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImageSelector.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ImageSelector.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ImageSelector.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ImageSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample())

      expect(imageSelector).toBeObject()
      expect(imageSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample())

      expect(imageSelector.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = ImageSelector.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ImageSelector.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ImageSelector.of(generateHTMLSample())
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('imageSelector:ready', () => {
        called++
      })

      const api = ImageSelector.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('imageSelector:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('imageSelector:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('imageSelector:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
