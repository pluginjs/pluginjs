import ItemList from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ItemList', () => {
  describe('ItemList()', () => {
    test('should have ItemList', () => {
      expect(ItemList).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ItemList.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ItemList.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ItemList.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ItemList.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const itemList = ItemList.of(generateHTMLSample())

      expect(itemList).toBeObject()
      expect(itemList.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const itemList = ItemList.of(generateHTMLSample())

      expect(itemList.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('itemList:ready', () => {
        called++
      })
      const instance = ItemList.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
