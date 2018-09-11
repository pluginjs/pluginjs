import PopDialog from '../src/main'
import generateHTMLSample from './fixtures/sample'

describe('PopDialog', () => {
  describe('PopDialog()', () => {
    test('should have PopDialog', () => {
      expect(PopDialog).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PopDialog.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(PopDialog.events).toBeObject()
    })

    test('should have classes', () => {
      expect(PopDialog.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(PopDialog.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const popDialog = PopDialog.of(generateHTMLSample())

      expect(popDialog).toBeObject()
      expect(popDialog.options).toBeObject()
    })

    test('should have options', () => {
      const popDialog = PopDialog.of(generateHTMLSample())

      expect(popDialog.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const popDialog = PopDialog.of(generateHTMLSample())
      expect(popDialog.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('popDialog:ready', () => {
        called++
      })
      const instance = PopDialog.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PopDialog.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('popDialog:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PopDialog.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('popDialog:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PopDialog.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('popDialog:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
