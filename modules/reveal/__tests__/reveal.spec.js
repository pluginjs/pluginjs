import Reveal from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Reveal', () => {
  describe('Reveal()', () => {
    test('should have Reveal', () => {
      expect(Reveal).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Reveal.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Reveal.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Reveal.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const reveal = new Reveal(element)

      expect(reveal).toBeObject()
      expect(reveal.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const reveal = new Reveal(element)

      expect(reveal.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asReveal()).toEqual($element)

      const api = $element.data('reveal')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asReveal()
      expect($element.asReveal('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asReveal()
      expect($element.asReveal('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('reveal:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asReveal()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asReveal()
      api = $element.data('reveal')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('reveal:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asReveal('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asReveal()
      api = $element.data('reveal')
    })

    test('should enable the plugin', () => {
      $element.asReveal('disable')
      $element.asReveal('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('reveal:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asReveal('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asReveal()
      api = $element.data('reveal')
    })

    test('should disable the plugin', () => {
      $element.asReveal('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('reveal:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asReveal('disable')
      expect(called).toEqual(1)
    })
  })
})
