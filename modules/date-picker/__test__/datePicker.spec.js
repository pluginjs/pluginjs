import $ from 'jquery'
import DatePicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('DatePicker', () => {
  describe('DatePicker()', () => {
    it('should have DatePicker', () => {
      expect(DatePicker).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(DatePicker.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(DatePicker.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(DatePicker.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(DatePicker.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const datePicker = new DatePicker(element)

      expect(datePicker).to.be.an('object')
      expect(datePicker.options).to.be.an('object')
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const datePicker = new DatePicker(element)

      expect(datePicker.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asDatePicker()).to.be.equal($element)

      const api = $element.data('datePicker')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asDatePicker()
      expect($element.asDatePicker('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asDatePicker()
      expect($element.asDatePicker('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('datePicker:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asDatePicker()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('datePicker:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asDatePicker('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    it('should enable the plugin', () => {
      $element.asDatePicker('disable')
      $element.asDatePicker('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('datePicker:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asDatePicker('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    it('should disable the plugin', () => {
      $element.asDatePicker('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('datePicker:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asDatePicker('disable')
      expect(called).to.be.equal(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    it('should have I18N', () => {
      expect(DatePicker.I18N).to.be.an('object')
    })

    describe('getLocale()', () => {
      it('should get default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)
      })

      it('should get locale with options set', () => {
        $element = $(document.createElement('div')).asDatePicker({
          locale: 'zh-cn'
        })
        api = $element.data('datePicker')
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
        DatePicker.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).to.be.equal('世界妳好')
      })
    })

    describe('fallbacks', () => {
      it('should fallbacks to less specific locale', () => {
        api.setLocale('zh')
        expect(api.translate('buttons')).to.be.eql(['取消', '保存'])
      })
    })

    describe('translate()', () => {
      it('should get translated message', () => {
        expect(api.translate('buttons')).to.be.eql(['Cancel', 'Save'])

        api.setLocale('zh')
        expect(api.translate('buttons')).to.be.eql(['取消', '保存'])
      })
    })
  })
})
