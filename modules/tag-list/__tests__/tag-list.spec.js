import TagList from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

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
    test('should work wtesth element', () => {
      const taglist = TagList.of(generateHTMLSample())

      expect(taglist).toBeObject()
      expect(taglist.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const taglist = TagList.of(generateHTMLSample())

      expect(taglist.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('taglist:ready', () => {
        called++
      })
      const instance = TagList.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
