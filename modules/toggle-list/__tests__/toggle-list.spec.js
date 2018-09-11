import ToggleList from '../src/main'
import List from '@pluginjs/list'
import { defaults as DEFAULTS } from '../src/constant'
import { deepMerge } from '@pluginjs/utils'
import generateHTMLSample from './fixtures/sample'

const value = '[{"label":"Interfaces","value":"interface","checked":true}]'
const arrVal = [{ label: 'Interfaces', value: 'interface', checked: true }]

describe('ToggleList', () => {
  describe('ToggleList()', () => {
    test('should have ToggleList', () => {
      expect(ToggleList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ToggleList.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ToggleList.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ToggleList.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ToggleList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const toggleList = ToggleList.of(generateHTMLSample())
      expect(toggleList).toBeObject()
      expect(toggleList.options).toEqual(deepMerge(List.defaults, DEFAULTS))
    })

    test('should have options', () => {
      const toggleList = ToggleList.of(generateHTMLSample())

      expect(toggleList.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = ToggleList.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ToggleList.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ToggleList.of(generateHTMLSample())
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

      $element.addEventListener('toggleList:ready', () => {
        called++
      })

      const api = ToggleList.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ToggleList.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('toggleList:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(value)
      api = ToggleList.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ToggleList.of($element, {
        onChange(value) {
          called = true
          expect(value).toBeArray(value)
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ToggleList.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeArray(arrVal)
        }
      })

      api.set(arrVal)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ToggleList.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = ToggleList.of($element)

      expect(api.get()).toEqual(arrVal)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ToggleList.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeArray()

      api.set(arrVal)
      expect(api.get()).toBeArray(arrVal)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ToggleList.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(value)

      expect(api.get()).toBeArray(arrVal)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ToggleList.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('toggleList:enable', () => {
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
      api = ToggleList.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('toggleList:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
