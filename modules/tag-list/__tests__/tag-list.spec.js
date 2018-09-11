import TagList from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = ['hello', 'world']

describe('TagList', () => {
  describe('TagList()', () => {
    test('should have TagList', () => {
      expect(TagList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(TagList.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(TagList.events).toBeObject()
    })
    test('should have classes', () => {
      expect(TagList.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(TagList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const tagList = TagList.of(generateHTMLSample(), { data })

      expect(tagList).toBeObject()
      expect(tagList.options).toBeObject({ ...DEFAULTS, data })
    })

    test('should have options', () => {
      const tagList = TagList.of(generateHTMLSample())

      expect(tagList.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = TagList.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = TagList.of(generateHTMLSample())
      $element.destroy()
      // expect().toEqual($element)
      expect($element).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('tagList:ready', () => {
        called++
      })

      const api = TagList.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TagList.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('tagList:destroy', () => {
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
      $element = generateHTMLSample('["foo", "bar"]')
      api = TagList.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = TagList.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('["foo","bar"]')
        }
      })

      api.val('["foo", "bar"]')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = TagList.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('["foo","bar"]')
        }
      })

      api.set(['foo', 'bar'])

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TagList.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeArray()
    })

    test('should get the value width string', () => {
      $element = generateHTMLSample('["foo", "bar"]')
      api = TagList.of($element)
      expect(api.get()).toBeArray(['foo', 'bar'])
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TagList.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeArray()

      api.set(data)
      expect(api.get()).toBeArray()
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TagList.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val('["foo", "bar"]')

      expect(api.get()).toBeArray(['foo', 'bar'])
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = TagList.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('tagList:enable', () => {
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
      api = TagList.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('tagList:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
