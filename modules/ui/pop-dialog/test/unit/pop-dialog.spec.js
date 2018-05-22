import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Tooltip from '@pluginjs/tooltip'
import Popover from '@pluginjs/popover'
import PopDialog from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('PopDialog', () => {
  describe('PopDialog()', () => {
    it('should have PopDialog', () => {
      expect(PopDialog).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(PopDialog.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(PopDialog.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(PopDialog.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(PopDialog.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const popDialog = new PopDialog(element)

      expect(popDialog).to.be.an('object')
      expect(popDialog.options).to.be.an('object')
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const popDialog = new PopDialog(element)

      expect(popDialog.options).to.be.an('object')
    })

    it('should have classes', () => {
      const element = document.createElement('div')
      const popDialog = new PopDialog(element)

      expect(popDialog.classes).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asPopDialog()).to.be.equal($element)

      const api = $element.data('popDialog')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  // describe('classes', () => {
  //   it('should use classes options', () => {
  //     let element = document.createElement('div');
  //     let popDialog = new PopDialog(element, {
  //       classes: {
  //         container: '{namespace}-wrap',
  //         active: '{namespace}-active'
  //       }
  //     });

  //     expect(popDialog.classes.CONTAINER).to.be.equal('pj-popDialog-wrap');
  //     expect(popDialog.classes.ACTIVE).to.be.equal('pj-popDialog-active');
  //   });

  //   it('should override class namespace', () => {
  //     let element = document.createElement('div');
  //     let popDialog = new PopDialog(element, {
  //       classes: {
  //         namespace: 'popDialog',
  //         container: '{namespace}-wrap'
  //       }
  //     });

  //     expect(popDialog.classes.NAMESPACE).to.be.equal('popDialog');
  //     expect(popDialog.classes.CONTAINER).to.be.equal('popDialog-wrap');
  //   });

  //   describe('getClass()', () => {
  //     it('should get class with namespace', () => {
  //       let element = document.createElement('div');
  //       let popDialog = new PopDialog(element, {
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(popDialog.getClass('foo')).to.be.equal('foo');
  //       expect(popDialog.getClass('{namespace}-foo')).to.be.equal('hello-foo');
  //     });

  //     it('should get class with arg', () => {
  //       let element = document.createElement('div');
  //       let popDialog = new PopDialog(element, {
  //         classes: {
  //           namespace: 'hello'
  //         }
  //       });

  //       expect(popDialog.getClass('foo', 'arg', 'value')).to.be.equal('foo');
  //       expect(popDialog.getClass('{namespace}-{arg}', 'arg', 'value')).to.be.equal('hello-value');
  //     });
  //   });
  // });

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asPopDialog()
      expect($element.asPopDialog('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asPopDialog()
      expect($element.asPopDialog('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('popDialog:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asPopDialog()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopDialog()
      api = $element.data('popDialog')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('popDialog:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asPopDialog('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopDialog()
      api = $element.data('popDialog')
    })

    it('should enable the plugin', () => {
      $element.asPopDialog('disable')
      $element.asPopDialog('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('popDialog:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asPopDialog('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asPopDialog()
      api = $element.data('popDialog')
    })

    it('should disable the plugin', () => {
      $element.asPopDialog('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('popDialog:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asPopDialog('disable')
      expect(called).to.be.equal(1)
    })
  })
})
