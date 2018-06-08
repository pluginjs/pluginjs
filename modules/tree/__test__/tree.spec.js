import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Tree from '../../src/main'
import Node from '../../src/node'
import { defaults as DEFAULTS } from '../../src/constant'

const data = [
  {
    name: 'node',
    children: [{ name: 'child1.png' }, { name: 'child2.jpg' }]
  },
  {
    name: 'node2',
    children: [
      {
        name: 'node3',
        children: [
          { name: 'child3.txt' },
          { name: 'child4.js' },
          {
            name: 'node4',
            children: [{ name: 'child5.png' }, { name: 'child6.jpg' }]
          }
        ]
      }
    ]
  },
  { name: 'child5.php' }
]

describe('Tree', () => {
  jsdom()
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
      const element = document.createElement('div')
      const tree = new Tree(element, { data })

      expect(tree).toBeObject()
      // expect(tree.options).toEqual(DEFAULTS);
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const tree = new Tree(element, { data })

      expect(tree.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asTree({ data })).toEqual($element)

      const api = $element.data('tree')
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asTree({ data })
      expect($element.asTree('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asTree({ data })
      expect($element.asTree('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('tree:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asTree({ data })
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTree({ data })
      api = $element.data('tree')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('tree:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asTree('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTree({ data })
      api = $element.data('tree')
    })

    test('should enable the plugin', () => {
      $element.asTree('disable')
      $element.asTree('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('tree:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asTree('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTree({ data })
      api = $element.data('tree')
    })

    test('should disable the plugin', () => {
      $element.asTree('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('tree:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asTree('disable')
      expect(called).toEqual(1)
    })
  })
})
