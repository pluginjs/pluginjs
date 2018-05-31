import $ from 'jquery'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import List from '@pluginjs/list'
import '@pluginjs/toggle'
import { deepMerge } from '@pluginjs/utils'
import ToggleList from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = [
  {
    title: 'Interfaces',
    checked: true
  },
  {
    title: 'UI Design',
    checked: false
  },
  {
    title: 'Web Design',
    checked: false
  },
  {
    title: 'Typography',
    checked: true
  },
  {
    title: 'Landing',
    checked: false
  }
]
describe('ToggleList', () => {
  describe('ToggleList()', () => {
    it('should have ToggleList', () => {
      expect(ToggleList).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ToggleList.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(ToggleList.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(ToggleList.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(ToggleList.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const toggleList = new ToggleList(element, { data })
      expect(toggleList).to.be.an('object')
      // expect(others).to.be.eql(deepMerge(List.defaults, DEFAULTS));
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const toggleList = new ToggleList(element, { data })

      expect(toggleList.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asToggleList({ data })).to.be.equal($element)

      const api = $element.data('toggleList')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asToggleList({ data })
      expect($element.asToggleList('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asToggleList({ data })
      $element.asToggleList('destroy')
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

      $element.on('toggleList:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asToggleList({ data })
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggleList({ data })
      api = $element.data('toggleList')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('toggleList:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asToggleList('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggleList({ data })
      api = $element.data('toggleList')
    })

    it('should enable the plugin', () => {
      $element.asToggleList('disable')
      $element.asToggleList('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('toggleList:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asToggleList('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asToggleList({ data })
      api = $element.data('toggleList')
    })

    it('should disable the plugin', () => {
      $element.asToggleList('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('toggleList:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asToggleList('disable')
      expect(called).to.be.equal(1)
    })
  })
})
