import $ from 'jquery'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import ImagePicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ImagePicker', () => {
  describe('ImagePicker()', () => {
    it('should have ImagePicker', () => {
      expect(ImagePicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(ImagePicker.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(ImagePicker.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(ImagePicker.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(ImagePicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const imagePicker = new ImagePicker(element)

      expect(imagePicker).to.be.an('object')
      expect(imagePicker.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const imagePicker = new ImagePicker(element)

      expect(imagePicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asImagePicker()).to.be.equal($element)

      const api = $element.data('imagePicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asImagePicker()
      expect($element.asImagePicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asImagePicker()
      expect($element.asImagePicker('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('imagePicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asImagePicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('imagePicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asImagePicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    it('should enable the plugin', () => {
      $element.asImagePicker('disable')
      $element.asImagePicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('imagePicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asImagePicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    it('should disable the plugin', () => {
      $element.asImagePicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('imagePicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asImagePicker('disable')
      expect(called).to.be.equal(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    it('should have I18N', () => {
      expect(ImagePicker.I18N).to.be.an('object')
    })

    describe('getLocale()', () => {
      it('should get default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)
      })

      it('should get locale with options set', () => {
        $element = $(document.createElement('div')).asImagePicker({
          locale: 'zh-cn'
        })
        api = $element.data('imagePicker')
        expect(api.getLocale()).to.be.equal('zh-cn')
      })
    })

    describe('setLocale()', () => {
      it('should override default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)

        api.setLocale('zh-cn')

        expect(api.getLocale()).to.be.equal('zh-cn')
      })
    })

    describe('addTransition', () => {
      it('should add transtion correctly', () => {
        ImagePicker.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).to.be.equal('世界妳好')
      })
    })

    describe('fallbacks', () => {
      it('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('change')).to.be.equal('更换图片')
      })
    })
  })
})
