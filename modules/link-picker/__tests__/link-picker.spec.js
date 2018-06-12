import LinkPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('LinkPicker', () => {
  describe('LinkPicker()', () => {
    test('should have LinkPicker', () => {
      expect(LinkPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(LinkPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(LinkPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(LinkPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(LinkPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const linkpicker = LinkPicker.of(generateHTMLSample())

      expect(linkpicker).toBeObject()
      expect(linkpicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const linkpicker = LinkPicker.of(generateHTMLSample())

      expect(linkpicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('linkpicker:ready', () => {
        called++
      })
      const instance = LinkPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
