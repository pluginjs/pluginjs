import $ from 'jquery'
import '@pluginjs/modal'
import EditPanel from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('EditPanel', () => {
  describe('EditPanel()', () => {
    it('should have EditPanel', () => {
      expect(EditPanel).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(EditPanel.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(EditPanel.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(EditPanel.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(EditPanel.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const editPanel = new EditPanel(element)

      expect(editPanel).to.be.an('object')
      expect(editPanel.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const editPanel = new EditPanel(element)

      expect(editPanel.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asEditPanel()).to.be.equal($element)

      const api = $element.data('editPanel')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asEditPanel()
      expect($element.asEditPanel('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asEditPanel()
      $element.asEditPanel('destroy')
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

      $element.on('editPanel:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asEditPanel()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asEditPanel()
      api = $element.data('editPanel')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('editPanel:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asEditPanel('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asEditPanel()
      api = $element.data('editPanel')
    })

    it('should enable the plugin', () => {
      $element.asEditPanel('disable')
      $element.asEditPanel('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('editPanel:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asEditPanel('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asEditPanel()
      api = $element.data('editPanel')
    })

    it('should disable the plugin', () => {
      $element.asEditPanel('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('editPanel:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asEditPanel('disable')
      expect(called).to.be.equal(1)
    })
  })
})
