import Draggable from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Draggable', () => {
  describe('Draggable()', () => {
    test('should have Draggable', () => {
      expect(Draggable).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Draggable.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Draggable.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Draggable.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Draggable.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const draggable = Draggable.of(generateHTMLSample())

      expect(draggable).toBeObject()
      expect(draggable.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const draggable = Draggable.of(generateHTMLSample())

      expect(draggable.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('draggable:ready', () => {
        called++
      })
      const instance = Draggable.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
