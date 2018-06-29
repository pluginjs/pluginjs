import AnimateText from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
  <span id="fade"
    data-mode="fadeDown"
    data-delay="1000"
    data-text="World!"
    style="display: inline-block;">World!</span>
`
const getNewAnimateTextInstance = () => AnimateText.of(getInitialElement())
describe('AnimateText', () => {
  describe('AnimateText()', () => {
    test('should have AnimateText', () => {
      expect(AnimateText).toBeFunction()
    })

    test('should have defaults', () => {
      expect(AnimateText.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(AnimateText.events).toBeObject()
    })
    test('should have classes', () => {
      expect(AnimateText.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(AnimateText.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const animateText = getNewAnimateTextInstance()

      expect(animateText).toBeObject()
      expect(animateText.options).toEqual({
        ...DEFAULTS,
        mode: 'fadeDown',
        delay: 1000,
        text: 'World!'
      })
    })

    test('should have options', () => {
      const element = getInitialElement()
      const animateText = AnimateText.of(element)

      expect(animateText.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should call destroy', () => {
      const animateTextInstance = getNewAnimateTextInstance()
      animateTextInstance.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getInitialElement()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('animateText:ready', () => {
        called++
      })

      const instance = AnimateText.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = AnimateText.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('animateText:destroy', () => {
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
      api = AnimateText.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('animateText:enable', () => {
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
      api = AnimateText.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('animateText:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
