import $ from 'jquery'
import InputMask from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const options = {
  type: 'custom',
  delimiter: '-',
  blocks: [2, 3, 5]
}
describe('InputMask', () => {
  describe('InputMask()', () => {
    test('should have InputMask', () => {
      expect(InputMask).toBeFunction()
    })

    test('should have defaults', () => {
      expect(InputMask.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(InputMask.events).toBeObject()
    })
    test('should have classes', () => {
      expect(InputMask.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(InputMask.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const inputMask = new InputMask(element, options)

      expect(inputMask).toBeObject()
      expect(inputMask.options).toEqual({
        ...DEFAULTS,
        ...options
      })
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const inputMask = new InputMask(element, options)

      expect(inputMask.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asInputMask(options)).toEqual($element)

      const api = $element.data('inputMask')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asInputMask(options)
      expect($element.asInputMask('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asInputMask(options)
      $element.asInputMask('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('inputMask:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asInputMask(options)
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInputMask(options)
      api = $element.data('inputMask')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('inputMask:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asInputMask('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInputMask(options)
      api = $element.data('inputMask')
    })

    test('should enable the plugin', () => {
      $element.asInputMask('disable')
      $element.asInputMask('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('inputMask:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asInputMask('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInputMask(options)
      api = $element.data('inputMask')
    })

    test('should disable the plugin', () => {
      $element.asInputMask('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('inputMask:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asInputMask('disable')
      expect(called).toEqual(1)
    })
  })
})
