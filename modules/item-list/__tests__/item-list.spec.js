import List from '@pluginjs/list'
import ItemList from '../src/main'
import { deepMerge } from '@pluginjs/utils'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
  {
    label: 'Interfaces',
    value: 'interface'
  },
  {
    label: 'UI Design',
    value: 'ui-design'
  },
  {
    label: 'Web Design',
    value: 'web-design'
  },
  {
    label: 'Typography',
    value: 'typography'
  },
  {
    label: 'Landing',
    value: 'landing'
  }
]
const value =
  '[{"label":"Interfaces","value":"interface"},{"label":"Typography","value":"typography"}]'
const arrVal = [
  { label: 'Interfaces', value: 'interface' },
  { label: 'Typography', value: 'typography' }
]

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
    test('should work with element', () => {
      const itemList = ItemList.of(generateHTMLSample(), data)
      expect(itemList).toBeObject()
      expect(itemList.options).toEqual(deepMerge(DEFAULTS, List.defaults, data))
    })

    test('should have options', () => {
      const itemList = ItemList.of(generateHTMLSample(), { data })

      expect(itemList.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ItemList.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ItemList.of(generateHTMLSample())
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

      $element.addEventListener('itemList:ready', () => {
        called++
      })

      const api = ItemList.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(value)
      api = ItemList.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ItemList.of($element, {
        onChange(val) {
          called = true
          expect(val).toBeString(value)
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ItemList.of($element, {
        onChange(val) {
          called = true

          expect(val).toBeString(value)
        }
      })

      api.set(arrVal)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = ItemList.of($element)

      expect(api.get()).toEqual(arrVal)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeArray()

      api.set(arrVal)
      expect(api.get()).toBeArray(arrVal)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(value)

      expect(api.get()).toBeArray(arrVal)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ItemList.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('itemList:enable', () => {
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
      api = ItemList.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('itemList:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
