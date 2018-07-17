import Paginator from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
  <div class="example">
    <ul class="paginator-less"></ul>
  </div>
`
const getNewPaginator = () => Paginator.of(getInitialElement())
describe('Paginator', () => {
  describe('Paginator()', () => {
    test('should have Paginator', () => {
      expect(Paginator).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Paginator.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Paginator.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Paginator.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Paginator.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const paginator = getNewPaginator()

      expect(paginator).toBeObject()
      expect(paginator.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const $element = getInitialElement()
      const paginator = Paginator.of($element)

      expect(paginator.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const paginator = getNewPaginator()
      expect(paginator.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const paginator = getNewPaginator()
      paginator.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getInitialElement()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('paginator:ready', () => {
        called++
      })

      const instance = Paginator.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = Paginator.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('paginator:destroy', () => {
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
      $element = getInitialElement()
      api = Paginator.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('paginator:enable', () => {
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
      $element = getInitialElement()
      api = Paginator.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('paginator:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
