import List from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
  {
    title: 'Interfaces',
    value: 'interface'
  },
  {
    title: 'UI Design',
    value: 'ui-design'
  },
  {
    title: 'Web Design',
    value: 'web-design'
  },
  {
    title: 'Typography',
    value: 'typography'
  },
  {
    title: 'Landing',
    value: 'landing'
  }
]

describe('List', () => {
  describe('List()', () => {
    test('should have List', () => {
      expect(List).toBeFunction()
    })

    test('should have defaults', () => {
      expect(List.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(List.events).toBeObject()
    })
    test('should have classes', () => {
      expect(List.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(List.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const list = List.of(generateHTMLSample(), { data })

      expect(list).toBeObject()
      expect(list.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const list = List.of(generateHTMLSample(), { data })

      expect(list.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = List.of($element, { data })

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = List.of(generateHTMLSample(), { data })
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = List.of(generateHTMLSample(), { data })
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

      $element.addEventListener('list:ready', () => {
        called++
      })

      const api = List.of($element, { data })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = List.of($element, { data })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('list:destroy', () => {
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
      api = List.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('list:enable', () => {
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
      api = List.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('list:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
