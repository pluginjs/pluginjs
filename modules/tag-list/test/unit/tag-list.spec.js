import $ from 'jquery'
import List from '@pluginjs/list'
import TagList from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('TagList', () => {
  describe('TagList()', () => {
    it('should have TagList', () => {
      expect(TagList).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(TagList.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(TagList.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(TagList.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(TagList.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const tagList = new TagList(element)

      expect(tagList).to.be.an('object')
      expect(tagList.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const tagList = new TagList(element)

      expect(tagList.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asTagList()).to.be.equal($element)

      const api = $element.data('tagList')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asTagList()
      expect($element.asTagList('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asTagList()
      $element.asTagList('destroy')
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

      $element.on('tagList:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asTagList()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTagList()
      api = $element.data('tagList')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('tagList:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asTagList('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTagList()
      api = $element.data('tagList')
    })

    it('should enable the plugin', () => {
      $element.asTagList('disable')
      $element.asTagList('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('tagList:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asTagList('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asTagList()
      api = $element.data('tagList')
    })

    it('should disable the plugin', () => {
      $element.asTagList('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('tagList:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asTagList('disable')
      expect(called).to.be.equal(1)
    })
  })
})
