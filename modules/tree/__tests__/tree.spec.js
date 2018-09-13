import Tree from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
  {
    name: 'Blog',
    children: [
      {
        name: 'About',
        children: [
          {
            name: 'Grid'
          },
          {
            name: 'Nest'
          },
          {
            name: 'Gallery'
          }
        ]
      },
      {
        name: 'list'
      }
    ]
  },
  {
    name: 'Work',
    children: [
      {
        name: 'list'
      },
      {
        name: 'list2'
      }
    ]
  }
]

describe('Tree', () => {
  describe('Tree()', () => {
    test('should have Tree', () => {
      expect(Tree).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tree.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tree.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tree.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tree.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = generateHTMLSample()
      const tree = Tree.of(element, { data })

      expect(tree).toBeObject()
      expect(tree.options).toEqual({ ...DEFAULTS, data })
    })

    test('should have options', () => {
      const tree = Tree.of(generateHTMLSample(), { data })

      expect(tree.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = generateHTMLSample()
      const tree = Tree.of($element, { data })
      expect(tree.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('tree:ready', () => {
        called++
      })

      const instance = Tree.of($element, { data })
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Tree.of($element, { data })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('tree:destroy', () => {
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
      $element = generateHTMLSample()
      api = Tree.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('tree:enable', () => {
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
      $element = generateHTMLSample()
      api = Tree.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('tree:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
