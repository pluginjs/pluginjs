import $ from 'jquery'
import '@pluginjs/modal'
import EditPanel from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('EditPanel', () => {
  describe('EditPanel()', () => {
    test('should have EditPanel', () => {
      expect(EditPanel).toBeFunction()
    })

    test('should have defaults', () => {
      expect(EditPanel.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(EditPanel.events).toBeObject()
    })
    test('should have classes', () => {
      expect(EditPanel.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(EditPanel.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const editPanel = new EditPanel(element)

      expect(editPanel).toBeObject()
      expect(editPanel.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const editPanel = new EditPanel(element)

      expect(editPanel.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asEditPanel()).toEqual($element)

      const api = $element.data('editPanel')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asEditPanel()
      expect($element.asEditPanel('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asEditPanel()
      $element.asEditPanel('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('editPanel:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asEditPanel()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asEditPanel()
      api = $element.data('editPanel')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('editPanel:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asEditPanel('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asEditPanel()
      api = $element.data('editPanel')
    })

    test('should enable the plugin', () => {
      $element.asEditPanel('disable')
      $element.asEditPanel('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('editPanel:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asEditPanel('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asEditPanel()
      api = $element.data('editPanel')
    })

    test('should disable the plugin', () => {
      $element.asEditPanel('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('editPanel:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asEditPanel('disable')
      expect(called).toEqual(1)
    })
  })
})
