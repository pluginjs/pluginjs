import Checkbox from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'
import { query } from '@pluginjs/dom'

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
      const $element = query('input', generateHTMLSample())
      const checkbox = Checkbox.of($element)

      expect(checkbox).toBeObject()
      expect(checkbox.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const $element = query('input', generateHTMLSample())
      const checkbox = Checkbox.of($element)

      expect(checkbox.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = query('input', generateHTMLSample())
      const api = Checkbox.of($element)
      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Checkbox.of(query('input', generateHTMLSample()))
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Checkbox.of(query('input', generateHTMLSample()))
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
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
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
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

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toEqual(true)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toEqual(true)

      api.set(false)
      expect(api.get()).toEqual(false)

      api.set(true)
      expect(api.get()).toEqual(true)
    })

    test('should set the value with string', () => {
      expect(api.get()).toEqual(true)

      api.set('false')
      expect(api.get()).toEqual(false)

      api.set('true')
      expect(api.get()).toEqual(true)
    })

    test('should set the value with number', () => {
      expect(api.get()).toEqual(true)

      api.set(0)
      expect(api.get()).toEqual(false)

      api.set(1)
      expect(api.get()).toEqual(true)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toEqual(true)
    })

    test('should set the value', () => {
      api.val(false)

      expect(api.get()).toEqual(false)

      api.val(true)

      expect(api.get()).toEqual(true)
    })

    test('should set the value with string', () => {
      api.val('false')

      expect(api.get()).toEqual(false)

      api.val('true')

      expect(api.get()).toEqual(true)
    })

    test('should set the value with number', () => {
      expect(api.get()).toEqual(true)

      api.val(0)
      expect(api.get()).toEqual(false)

      api.val(1)
      expect(api.get()).toEqual(true)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
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
      $element = query('input', generateHTMLSample())
      api = Checkbox.of($element)
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
