import $ from 'jquery'
import AutoComplete from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = [
  'JAVA',
  'java',
  'java Script',
  'go',
  'swift',
  'C++',
  '易语言',
  'C#',
  'Python',
  'Ruby'
]
describe('AutoComplete', () => {
  describe('AutoComplete()', () => {
    it('should have AutoComplete', () => {
      expect(AutoComplete).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(AutoComplete.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(AutoComplete.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(AutoComplete.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(AutoComplete.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const autoComplete = new AutoComplete(element, { data })

      expect(autoComplete).to.be.an('object')
      expect(autoComplete.options).to.be.eql({
        ...DEFAULTS,
        data
      })
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const autoComplete = new AutoComplete(element, { data })

      expect(autoComplete.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asAutoComplete({ data })).to.be.equal($element)

      const api = $element.data('autoComplete')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asAutoComplete({ data })
      expect($element.asAutoComplete('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asAutoComplete({ data })
      $element.asAutoComplete('destroy')
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

      $element.on('autoComplete:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asAutoComplete({ data })
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAutoComplete({ data })
      api = $element.data('autoComplete')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('autoComplete:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asAutoComplete('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAutoComplete({ data })
      api = $element.data('autoComplete')
    })

    it('should enable the plugin', () => {
      $element.asAutoComplete('disable')
      $element.asAutoComplete('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('autoComplete:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asAutoComplete('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asAutoComplete({ data })
      api = $element.data('autoComplete')
    })

    it('should disable the plugin', () => {
      $element.asAutoComplete('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('autoComplete:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asAutoComplete('disable')
      expect(called).to.be.equal(1)
    })
  })
})
