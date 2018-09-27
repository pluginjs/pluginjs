import Cascader from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const getChildren = index => {
  return [
    'Foo',
    'Bar',
    'Baz',
    'Qux',
    'Quux',
    'Quuz',
    'Corge',
    'Grault',
    'Garply',
    'Waldo',
    'Fred',
    'Plugh'
  ].map(item => {
    return {
      value: `${item.toLowerCase()}-${index}`,
      label: `${item} ${index}`
    }
  })
}
const source = [
  {
    value: 1,
    label: 'Group 1',
    children: getChildren(1)
  },
  {
    value: 2,
    label: 'Group 2',
    children: getChildren(2)
  },
  {
    value: 3,
    label: 'Group 3',
    children: getChildren(3)
  },
  {
    value: 4,
    label: 'Group 4',
    children: getChildren(4)
  },
  {
    value: 5,
    label: 'Group 5',
    children: getChildren(5)
  }
]

describe('Cascader', () => {
  describe('Cascader()', () => {
    test('should have Cascader', () => {
      expect(Cascader).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Cascader.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Cascader.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Cascader.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Cascader.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const cascader = Cascader.of(generateHTMLSample())

      expect(cascader).toBeObject()
      expect(cascader.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const cascader = Cascader.of(generateHTMLSample())

      expect(cascader.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Cascader.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('cascader:ready', () => {
        called++
      })
      const instance = Cascader.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Cascader.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('cascader:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample()
      api = Cascader.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Cascader.of($element, {
        source,
        onChange(value) {
          called = true
          expect(value).toEqual([1, 'baz-1'])
        }
      })

      api.val('[1,"baz-1"]')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Cascader.of($element, {
        source,
        onChange(value) {
          called = true
          expect(value).toEqual([1, 'baz-1'])
        }
      })

      api.set([1, 'baz-1'])

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Cascader.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeArray()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Cascader.of($element, { source })
    })

    test('should set the value with string', () => {
      expect(api.get()).toBeArray()

      api.set([1, 'baz-1'])
      expect(api.get()).toEqual([1, 'baz-1'])
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Cascader.of($element, { source })
    })

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = Cascader.of($element, { source })

      expect(api.val()).toBeString()
    })

    test('should set the value with string', () => {
      api.val('[1,"baz-1"]')
      expect(api.val()).toBe('[1,"baz-1"]')
      expect(api.get()).toEqual([1, 'baz-1'])
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Cascader.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('cascader:enable', () => {
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
      api = Cascader.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('cascader:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
