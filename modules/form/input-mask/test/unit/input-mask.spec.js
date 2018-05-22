import $ from 'jquery'
import InputMask from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const options = {
  type: 'custom',
  delimiter: '-',
  blocks: [2, 3, 5]
}
describe('InputMask', () => {
  describe('InputMask()', () => {
    it('should have InputMask', () => {
      expect(InputMask).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(InputMask.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(InputMask.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(InputMask.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(InputMask.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const inputMask = new InputMask(element, options)

      expect(inputMask).to.be.an('object')
      expect(inputMask.options).to.be.eql({
        ...DEFAULTS,
        ...options
      })
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const inputMask = new InputMask(element, options)

      expect(inputMask.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asInputMask(options)).to.be.equal($element)

      const api = $element.data('inputMask')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asInputMask(options)
      expect($element.asInputMask('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asInputMask(options)
      $element.asInputMask('destroy')
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

      $element.on('inputMask:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asInputMask(options)
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInputMask(options)
      api = $element.data('inputMask')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('inputMask:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asInputMask('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInputMask(options)
      api = $element.data('inputMask')
    })

    it('should enable the plugin', () => {
      $element.asInputMask('disable')
      $element.asInputMask('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('inputMask:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asInputMask('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asInputMask(options)
      api = $element.data('inputMask')
    })

    it('should disable the plugin', () => {
      $element.asInputMask('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('inputMask:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asInputMask('disable')
      expect(called).to.be.equal(1)
    })
  })
})
