import $ from 'jquery'
import AutoComplete from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = [
  'JAVA',
  'java',
  'java Script',
  'go',
  'swift',
  'C++',
  '易语言',
  'C#',
  'Python',
  'Ruby'
]
describe('AutoComplete', () => {
  describe('AutoComplete()', () => {
    test('should have AutoComplete', () => {
      expect(AutoComplete).toBeFunction()
    })

    test('should have defaults', () => {
      expect(AutoComplete.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(AutoComplete.events).toBeObject()
    })
    test('should have classes', () => {
      expect(AutoComplete.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(AutoComplete.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const autoComplete = new AutoComplete(element, { data })

      expect(autoComplete).toBeObject()
      expect(autoComplete.options).toEqual({
        ...DEFAULTS,
        data
      })
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const autoComplete = new AutoComplete(element, { data })

      expect(autoComplete.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asAutoComplete({ data })).toEqual($element)

      const api = $element.data('autoComplete')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asAutoComplete({ data })
      expect($element.asAutoComplete('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asAutoComplete({ data })
      $element.asAutoComplete('destroy')
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

      $element.on('autoComplete:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asAutoComplete({ data })
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAutoComplete({ data })
      // api =
      $element.data('autoComplete')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('autoComplete:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asAutoComplete('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAutoComplete({ data })
      api = $element.data('autoComplete')
    })

    test('should enable the plugin', () => {
      $element.asAutoComplete('disable')
      $element.asAutoComplete('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('autoComplete:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asAutoComplete('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAutoComplete({ data })
      api = $element.data('autoComplete')
    })

    test('should disable the plugin', () => {
      $element.asAutoComplete('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('autoComplete:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asAutoComplete('disable')
      expect(called).toEqual(1)
    })
  })
})
