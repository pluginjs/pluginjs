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
    test('should have SectionScroll', () => {
      expect(SectionScroll).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SectionScroll.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(SectionScroll.events).toBeObject()
    })

    test('should have classes', () => {
      expect(SectionScroll.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(SectionScroll.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const sectionScroll = new SectionScroll(element, {
        itemSelector: '.section'
      })

      expect(sectionScroll).toBeObject()
      // expect(sectionScroll.options).toEqual(DEFAULTS);
    })

    test('should have options', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const sectionScroll = new SectionScroll(element, {
        itemSelector: '.section'
      })

      expect(sectionScroll.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element)

      expect($element.asSectionScroll({ itemSelector: '.section' })).toEqual(
        $element
      )

      const api = $element.data('sectionScroll')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element).asSectionScroll({ itemSelector: '.section' })
      expect($element.asSectionScroll('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asSectionScroll({
        itemSelector: '.section'
      })
      expect($element.asSectionScroll('destroy')).toEqual($element)
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

    test('should trigger ready event', () => {
      let called = 0

      $element.on('sectionScroll:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSectionScroll({ itemSelector: '.section' })
      expect(called).toEqual(1)
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

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('sectionScroll:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asSectionScroll('destroy')

      expect(called).toEqual(1)
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

    test('should enable the plugin', () => {
      $element.asSectionScroll('disable')
      $element.asSectionScroll('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('sectionScroll:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSectionScroll('enable')
      expect(called).toEqual(1)
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

    test('should disable the plugin', () => {
      $element.asSectionScroll('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('sectionScroll:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSectionScroll('disable')
      expect(called).toEqual(1)
    })
  })
})
