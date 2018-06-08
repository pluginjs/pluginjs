import $ from 'jquery'
import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/gradient'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import GradientPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = {
  'warm-flame':
    'linear-gradient(45deg, rgba(233,23,233,0.5) 0%, rgba(23,23,233,0.6) 99%, #fad0c4 100%)',
  'night-fade': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'spring-warnth':
    'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)',
  'juicy-peach': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'young-passion':
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'lady-lips': 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'sunny-morning': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'rainy-ashville': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
}
GradientPicker.setData(data)
describe('GradientPicker', () => {
  describe('GradientPicker()', () => {
    it('should have GradientPicker', () => {
      expect(GradientPicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(GradientPicker.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(GradientPicker.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(GradientPicker.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(GradientPicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const gradientPicker = new GradientPicker(element)

      expect(gradientPicker).to.be.an('object')
      expect(gradientPicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const gradientPicker = new GradientPicker(element)

      expect(gradientPicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGradientPicker()).to.be.equal($element)

      const api = $element.data('gradientPicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asGradientPicker()
      expect($element.asGradientPicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asGradientPicker()
      $element.asGradientPicker('destroy')
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

      $element.on('gradientPicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asGradientPicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGradientPicker()
      api = $element.data('gradientPicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('gradientPicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asGradientPicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGradientPicker()
      api = $element.data('gradientPicker')
    })

    it('should enable the plugin', () => {
      $element.asGradientPicker('disable')
      $element.asGradientPicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('gradientPicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asGradientPicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGradientPicker()
      api = $element.data('gradientPicker')
    })

    it('should disable the plugin', () => {
      $element.asGradientPicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('gradientPicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asGradientPicker('disable')
      expect(called).to.be.equal(1)
    })
  })
})
