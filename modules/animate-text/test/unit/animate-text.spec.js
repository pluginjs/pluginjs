import jsdom from 'mocha-jsdom'
import AnimateText from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import { parseHTML } from '@pluginjs/dom'

const getInitialElement = () => parseHTML`
  <span id="fade"
    data-mode="fadeDown"
    data-delay="1000"
    data-text="World!"
    style="display: inline-block;">World!</span>
`
const getNewAnimateTextInstance = () => AnimateText.of(getInitialElement())
describe('AnimateText', () => {
  describe('AnimateText()', () => {
    it('should have AnimateText', () => {
      expect(AnimateText).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(AnimateText.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(AnimateText.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(AnimateText.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(AnimateText.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const animateText = getNewAnimateTextInstance()

      expect(animateText).to.be.an('object')
      expect(animateText.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = getInitialElement()
      const animateText = AnimateText.of(element)

      expect(animateText.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should call destroy', () => {
      const animateTextInstance = getNewAnimateTextInstance()
      animateTextInstance.destroy()
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = getInitialElement()
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('animateText:ready', event => {
        const api = event.detail.instance
        expect(api.is('initialized')).to.be.true
        called++
      })

      AnimateText.of($element)
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = AnimateText.of($element)
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('animateText:destroy', () => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      api.destroy()

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = AnimateText.of($element)
    })

    it('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('animateText:enable', () => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asAnimateText('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = getInitialElement()
      api = AnimateText.of($element)
    })

    it('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('animateText:disable', () => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      api.disable()
      expect(called).to.be.equal(1)
    })
  })
})
