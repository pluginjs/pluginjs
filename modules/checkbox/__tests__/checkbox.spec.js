import Checkbox from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = {
  classes: {
    icon: 'icon-check-mini'
  }
}
describe('Checkbox', () => {
  describe('Checkbox()', () => {
    test('should have Checkbox', () => {
      expect(Checkbox).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Checkbox.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Checkbox.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Checkbox.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Checkbox.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const checkbox = Checkbox.of(generateHTMLSample(), { data })

      expect(checkbox).toBeObject()
      expect(checkbox.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const checkbox = Checkbox.of(generateHTMLSample(), { data })

      expect(checkbox.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Checkbox.of($element, { data })
      expect(api.asCheckbox()).toEqual(api)

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Checkbox.of(generateHTMLSample(), { data })
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Checkbox.of(generateHTMLSample(), { data })
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
      api = Checkbox.of($element, { data })
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('checkbox:ready', () => {
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
      api = Checkbox.of($element, { data })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('checkbox:destroy', () => {
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
      api = Checkbox.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('checkbox:enable', () => {
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
      api = Checkbox.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('checkbox:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
