import $ from 'jquery'
import '@pluginjs/units'
import '@pluginjs/dropdown'
import '@pluginjs/range'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
// import '@pluginjs/pop-dialog'
import FontEditor from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const defaultValue =
  "{'fontFamily': 'Arial', 'fontSize': '30px', 'lineHeight': '1.5em', 'fontWeight': 'bold', 'textAlign': 'left', 'fontStyle': 'italy', 'textTransform': 'capitalize', 'textDecoration': 'underline'}"
describe('FontEditor', () => {
  describe('FontEditor()', () => {
    it('should have FontEditor', () => {
      expect(FontEditor).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(FontEditor.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(FontEditor.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(FontEditor.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(FontEditor.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('input')
      element.value = defaultValue
      const fontEditor = new FontEditor(element)

      expect(fontEditor).to.be.an('object')
      expect(fontEditor.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('input')
      element.value = defaultValue
      const fontEditor = new FontEditor(element)

      expect(fontEditor.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('input')
      element.value = defaultValue
      const $element = $(element)

      expect($element.asFontEditor()).to.be.equal($element)

      const api = $element.data('fontEditor')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('input')).asFontEditor()
      expect($element.asFontEditor('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('input')).asFontEditor()
      expect($element.asFontEditor('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element, api

    beforeEach(() => {
      $element = $(document.createElement('input'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('fontEditor:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asFontEditor()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('fontEditor:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asFontEditor('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    it('should enable the plugin', () => {
      $element.asFontEditor('disable')
      $element.asFontEditor('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('fontEditor:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asFontEditor('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    it('should disable the plugin', () => {
      $element.asFontEditor('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('fontEditor:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asFontEditor('disable')
      expect(called).to.be.equal(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    it('should have I18N', () => {
      expect(FontEditor.I18N).to.be.an('object')
    })

    describe('getLocale()', () => {
      it('should get default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)
      })

      it('should get locale with options set', () => {
        $element = $(document.createElement('input')).asFontEditor({
          locale: 'zh-cn'
        })
        api = $element.data('fontEditor')
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
        FontEditor.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).to.be.equal('世界妳好')
      })
    })

    describe('fallbacks', () => {
      it('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('change')).to.be.equal('更改')
      })
    })

    describe('translate()', () => {
      it('should get translated message', () => {
        expect(api.translate('change')).to.be.equal('Change')

        api.setLocale('zh')
        expect(api.translate('change')).to.be.equal('更改')
      })
    })
  })
})
