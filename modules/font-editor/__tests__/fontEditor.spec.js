import FontEditor from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('FontEditor', () => {
  describe('FontEditor()', () => {
    test('should have FontEditor', () => {
      expect(FontEditor).toBeFunction()
    })

    test('should have defaults', () => {
      expect(FontEditor.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(FontEditor.events).toBeObject()
    })

    test('should have classes', () => {
      expect(FontEditor.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(FontEditor.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const fontEditor = FontEditor.of(generateHTMLSample())

      expect(fontEditor).toBeObject()
      expect(fontEditor.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const fontEditor = FontEditor.of(generateHTMLSample())

      expect(fontEditor.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('fontEditor:ready', () => {
        called++
      })
      const instance = FontEditor.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
