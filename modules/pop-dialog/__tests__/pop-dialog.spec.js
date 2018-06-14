import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Tooltip from '@pluginjs/tooltip'
import Popover from '@pluginjs/popover'
import PopDialog from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('PopDialog', () => {
  describe('PopDialog()', () => {
    test('should have PopDialog', () => {
      expect(PopDialog).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PopDialog.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(PopDialog.events).toBeObject()
    })

    test('should have classes', () => {
      expect(PopDialog.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(PopDialog.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const popDialog = new PopDialog(element)

      expect(popDialog).toBeObject()
      expect(popDialog.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const popDialog = new PopDialog(element)

      expect(popDialog.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const popDialog = new PopDialog(element)

      expect(popDialog.classes).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPopDialog()).toEqual($element)

      const api = $element.data('popDialog')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  // describe('classes', () => {
  //   test('should use classes options', () => {
  //     let element = document.createElement('div');
  //     let popDialog = new PopDialog(element, {
  //       classes: {
  //         container: '{namespace}-wrap',
  //         active: '{namespace}-active'
  //       }
  //     });

  //     expect(popDialog.classes.CONTAINER).toEqual('pj-popDialog-wrap');
  //     expect(popDialog.classes.ACTIVE).toEqual('pj-popDialog-active');
  //   });

  //   test('should override class namespace', () => {
  //     let element = document.createElement('div');
  //     let popDialog = new PopDialog(element, {
  //       classes: {
  //         namespace: 'popDialog',
  //         container: '{namespace}-wrap'
  //       }
  //     });

  //     expect(popDialog.classes.NAMESPACE).toEqual('popDialog');
  //     expect(popDialog.classes.CONTAINER).toEqual('popDialog-wrap');
  //   });

  //   describe('getClass()', () => {
  //     test('should get class with namespace', () => {
  //       let element = document.createElement('div');
  //       let popDialog = new PopDialog(element, {
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(popDialog.getClass('foo')).toEqual('foo');
  //       expect(popDialog.getClass('{namespace}-foo')).toEqual('hello-foo');
  //     });

  //     test('should get class with arg', () => {
  //       let element = document.createElement('div');
  //       let popDialog = new PopDialog(element, {
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(popDialog.getClass('foo', 'arg', 'value')).toEqual('foo');
  //       expect(popDialog.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual('hello-value');
  //     });
  //   });
  // });

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asPopDialog()
      expect($element.asPopDialog('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asPopDialog()
      expect($element.asPopDialog('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('popDialog:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asPopDialog()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopDialog()
      api = $element.data('popDialog')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('popDialog:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asPopDialog('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopDialog()
      api = $element.data('popDialog')
    })

    test('should enable the plugin', () => {
      $element.asPopDialog('disable')
      $element.asPopDialog('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('popDialog:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asPopDialog('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopDialog()
      api = $element.data('popDialog')
    })

    test('should disable the plugin', () => {
      $element.asPopDialog('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('popDialog:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asPopDialog('disable')
      expect(called).toEqual(1)
    })
  })
})
