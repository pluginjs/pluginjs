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
    it('should have Tree', () => {
      expect(Tree).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Tree.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Tree.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Tree.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Tree.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const tree = new Tree(element, { data })

      expect(tree).to.be.an('object')
      // expect(tree.options).to.be.eql(DEFAULTS);
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const tree = new Tree(element, { data })

      expect(tree.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asTree({ data })).to.be.equal($element)

      const api = $element.data('tree')
      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asTree({ data })
      expect($element.asTree('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asTree({ data })
      expect($element.asTree('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('tree:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asTree({ data })
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTree({ data })
      api = $element.data('tree')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('tree:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asTree('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTree({ data })
      api = $element.data('tree')
    })

    it('should enable the plugin', () => {
      $element.asTree('disable')
      $element.asTree('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('tree:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asTree('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTree({ data })
      api = $element.data('tree')
    })

    it('should disable the plugin', () => {
      $element.asTree('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('tree:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asTree('disable')
      expect(called).to.be.equal(1)
    })
  })
})
