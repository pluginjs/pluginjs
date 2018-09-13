import Progress from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Progress', () => {
  describe('Progress()', () => {
    test('should have Progress', () => {
      expect(Progress).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Progress.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Progress.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Progress.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Progress.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const progress = Progress.of(generateHTMLSample())

      expect(progress).toBeObject()
      expect(progress.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const progress = Progress.of(generateHTMLSample(), {
        goal: 30
      })

      expect(progress.options).toBeObject()
      expect(progress.options.goal).toEqual(30)
    })
  })

  describe('api call', () => {
    test('should not call start', () => {
      const $element = Progress.of(generateHTMLSample())
      expect($element.start()).toBeNil()
    })

    test('should call destroy', () => {
      const api = Progress.of(generateHTMLSample())
      api.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('progress:ready', () => {
        called++
      })

      const instance = Progress.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Progress.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('progress:destroy', () => {
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
      api = Progress.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('progress:enable', () => {
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
      api = Progress.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('progress:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
