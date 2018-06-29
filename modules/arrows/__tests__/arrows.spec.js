import Arrows from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
<div class="pj-arrows">
  <a class="pj-arrow pj-arrow-prev" href="javascript:void(0);" alt="Previous">
    <i class="pj-arrow-icon icon-chevron-left"></i>
  </a>
  <a class="pj-arrow pj-arrow-next" href="javascript:void(0);" alt="Next">
    <i class="pj-arrow-icon icon-chevron-right"></i>
  </a>
</div>
`

describe('Arrows', () => {
  describe('Arrows()', () => {
    test('should have Arrows', () => {
      expect(Arrows).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Arrows.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Arrows.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Arrows.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Arrows.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const arrows = Arrows.of(getInitialElement())

      expect(arrows).toBeObject()
      expect(arrows.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const arrows = Arrows.of(getInitialElement())

      expect(arrows.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const arrows = Arrows.of(getInitialElement())
      expect(arrows.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const arrows = Arrows.of(getInitialElement())
      arrows.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getInitialElement()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('arrows:ready', () => {
        called++
      })
      const instance = Arrows.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = Arrows.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('arrows:destroy', () => {
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
      api = Arrows.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('arrows:enable', () => {
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
      api = Arrows.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('arrows:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
