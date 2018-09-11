import Countdown from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Countdown', () => {
  describe('Countdown()', () => {
    test('should have Countdown', () => {
      expect(Countdown).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Countdown.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Countdown.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Countdown.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Countdown.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const countdown = Countdown.of(generateHTMLSample())

      expect(countdown).toBeObject()
      expect(countdown.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const countdown = Countdown.of(generateHTMLSample(), {
        mode: 'flip'
      })

      expect(countdown.options).toBeObject()
      expect(countdown.options.mode).toEqual('flip')
    })
  })

  describe('api call', () => {
    test('should call start', () => {
      const $element = Countdown.of(generateHTMLSample())
      $element.start()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('countdown:ready', () => {
        called++
      })

      const instance = Countdown.of($element)

      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Countdown.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('countdown:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      setTimeout(() => {
        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Countdown.of($element)
    })

    test('should enable the plugin', () => {
      setTimeout(() => {
        api.disable()
        api.enable()
      }, 0)

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('countdown:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      setTimeout(() => {
        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Countdown.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('countdown:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      setTimeout(() => {
        expect(called).toEqual(1)
      }, 0)
    })
  })
})
