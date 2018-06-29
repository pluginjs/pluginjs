import Choice from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const options = {
  value: 'default',
  data: {
    on: {
      label: 'on'
    },
    off: {
      label: 'off'
    },
    default: {
      label: 'default'
    }
  },
  multiple: false
}

describe('Choice', () => {
  describe('Choice()', () => {
    test('should have Choice', () => {
      expect(Choice).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Choice.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Choice.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Choice.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Choice.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const choice = Choice.of(generateHTMLSample(), options)

      expect(choice).toBeObject()
      expect(choice.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const choice = Choice.of(generateHTMLSample(), options)

      expect(choice.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Choice.of($element, options)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Choice.of(generateHTMLSample(), options)
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Choice.of(generateHTMLSample(), options)
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('choice:ready', () => {
        called++
      })

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('choice:destroy', () => {
        called++
      })

      $element.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('choice:enable', () => {
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
      api = Choice.of($element, options)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('choice:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
