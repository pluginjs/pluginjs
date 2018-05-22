import $ from 'jquery'
import Strength from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Strength', () => {
  describe('Strength()', () => {
    it('should have Strength', () => {
      expect(Strength).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Strength.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Strength.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Strength.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Strength.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      const strength = new Strength(element)

      expect(strength).to.be.an('object')
      expect(strength.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      const strength = new Strength(element)

      expect(strength.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asStrength()).to.be.equal($element)

      const api = $element.data('strength')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const $element = $(document.createElement('div')).asStrength()
      expect($element.asStrength('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asStrength()
      expect($element.asStrength('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('strength:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asStrength()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('strength:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asStrength('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    it('should enable the plugin', () => {
      $element.asStrength('disable')
      $element.asStrength('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('strength:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asStrength('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    it('should disable the plugin', () => {
      $element.asStrength('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('strength:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asStrength('disable')
      expect(called).to.be.equal(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    it('should have I18N', () => {
      expect(Strength.I18N).to.be.an('object')
    })

    describe('getLocale()', () => {
      it('should get default locale', () => {
        expect(api.getLocale()).to.be.equal(DEFAULTS.locale)
      })

      it('should get locale with options set', () => {
        $element = $(document.createElement('div')).asStrength({
          locale: 'zh-cn'
        })
        api = $element.data('strength')
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
        Strength.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).to.be.equal('世界妳好')
      })
    })

    describe('fallbacks', () => {
      it('should fallbacks to less specific locale', () => {
        api.setLocale('zh')
        expect(api.translate('Weak')).to.be.equal('弱')
      })
    })

    describe('translate()', () => {
      it('should get translated message', () => {
        expect(api.translate('Weak')).to.be.equal('Weak')

        api.setLocale('zh')
        expect(api.translate('Weak')).to.be.equal('弱')
      })
    })
  })
})
