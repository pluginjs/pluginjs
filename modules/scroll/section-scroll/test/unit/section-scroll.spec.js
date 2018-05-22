import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import SectionScroll from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import '@pluginjs/dots'
import 'hammerjs'
import 'jquery-mousewheel'
import '@pluginjs/scroll-spy'
import '@pluginjs/scroll'

const testStr = `<section id="home" class="section">
<div class="inner">
  <h1 class="section-title">Home</h1>
</div>`
describe('SectionScroll', () => {
  describe('SectionScroll()', () => {
    it('should have SectionScroll', () => {
      expect(SectionScroll).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(SectionScroll.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(SectionScroll.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(SectionScroll.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(SectionScroll.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const sectionScroll = new SectionScroll(element, {
        itemSelector: '.section'
      })

      expect(sectionScroll).to.be.an('object')
      // expect(sectionScroll.options).to.be.eql(DEFAULTS);
    })

    it('should have options', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const sectionScroll = new SectionScroll(element, {
        itemSelector: '.section'
      })

      expect(sectionScroll.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element)

      expect(
        $element.asSectionScroll({ itemSelector: '.section' })
      ).to.be.equal($element)

      const api = $element.data('sectionScroll')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element).asSectionScroll({ itemSelector: '.section' })
      expect($element.asSectionScroll('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const $element = $(document.createElement('div')).asSectionScroll({
        itemSelector: '.section'
      })
      expect($element.asSectionScroll('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      $element = $(element)
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('sectionScroll:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSectionScroll({ itemSelector: '.section' })
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      $element = $(element).asSectionScroll({ itemSelector: '.section' })
      api = $element.data('sectionScroll')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('sectionScroll:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSectionScroll('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      $element = $(element).asSectionScroll({ itemSelector: '.section' })
      api = $element.data('sectionScroll')
    })

    it('should enable the plugin', () => {
      $element.asSectionScroll('disable')
      $element.asSectionScroll('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('sectionScroll:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSectionScroll('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      $element = $(element).asSectionScroll({ itemSelector: '.section' })
      api = $element.data('sectionScroll')
    })

    it('should disable the plugin', () => {
      $element.asSectionScroll('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('sectionScroll:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSectionScroll('disable')
      expect(called).to.be.equal(1)
    })
  })
})
