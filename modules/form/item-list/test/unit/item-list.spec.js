import $ from 'jquery'
import { deepMerge } from '@pluginjs/utils'
import List from '@pluginjs/list'
import ItemList from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ItemList', () => {
  describe('ItemList()', () => {
    it('should have ItemList', () => {
      expect(ItemList).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ItemList.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(ItemList.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(ItemList.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(ItemList.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const itemList = new ItemList(element)

      expect(itemList).to.be.an('object')
      expect(itemList.options).to.be.eql(deepMerge(DEFAULTS, List.defaults))
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const itemList = new ItemList(element)

      expect(itemList.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asItemList()).to.be.equal($element)

      const api = $element.data('itemList')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asItemList()
      expect($element.asItemList('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asItemList()
      $element.asItemList('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('itemList:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asItemList()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asItemList()
      api = $element.data('itemList')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('itemList:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asItemList('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asItemList()
      api = $element.data('itemList')
    })

    it('should enable the plugin', () => {
      $element.asItemList('disable')
      $element.asItemList('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('itemList:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asItemList('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asItemList()
      api = $element.data('itemList')
    })

    it('should disable the plugin', () => {
      $element.asItemList('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('itemList:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asItemList('disable')
      expect(called).to.be.equal(1)
    })
  })
})
