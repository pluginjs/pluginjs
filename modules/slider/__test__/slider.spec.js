import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Slider from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const testStr = `<div class="pj-slider-prev">
<a class="pj-arrow pj-arrow-prev"
    href="#prev"
    alt="Previous"
    data-toggle="tooltip"
    data-trigger="hover">
  <i class="pj-arrow-icon icon-chevron-left"></i>
</a>
</div>
<div class="pj-slider-container">
<div class="pj-slider-box">
  <div class="pj-slider-card-1"></div>
  <div class="pj-slider-card-2"></div>
  <div class="pj-slider-card-3"></div>
  <div class="pj-slider-card-4"></div>
</div>
<div class="pj-slider-dots">
  <ul class="pj-dots">
    <li class="pj-dot pj-dot-active"><a href="#first">first</a></li>
    <li class="pj-dot"><a href="#second">second</a></li>
    <li class="pj-dot"><a href="#third">third</a></li>
    <li class="pj-dot"><a href="#fourth">fourth</a></li>
  </ul>
</div>
</div>
<div class="pj-slider-prev">
<a class="pj-arrow pj-arrow-next"
    href="#next"
    alt="Next"
    data-toggle="tooltip"
    data-trigger="hover"
    title="下一页">
  <i class="pj-arrow-icon icon-chevron-right"></i>
</a>
</div>`
describe('Slider', () => {
  describe('Slider()', () => {
    test('should have Slider', () => {
      expect(Slider).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Slider.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Slider.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Slider.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Slider.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const slider = new Slider(element)

      expect(slider).toBeObject()
      expect(slider.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const slider = new Slider(element)

      expect(slider.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element)

      expect($element.asSlider()).toEqual($element)

      const api = $element.data('slider')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element).asSlider()
      expect($element.asSlider('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element).asSlider()
      $element.asSlider('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
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

      $element.on('slider:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asSlider()
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
      $element = $(element).asSlider()
      api = $element.data('slider')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('slider:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asSlider('destroy')

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
      $element = $(element).asSlider()
      api = $element.data('slider')
    })

    test('should enable the plugin', () => {
      $element.asSlider('disable')
      $element.asSlider('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('slider:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asSlider('enable')
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
      $element = $(element).asSlider()
      api = $element.data('slider')
    })

    test('should disable the plugin', () => {
      $element.asSlider('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('slider:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asSlider('disable')
      expect(called).toEqual(1)
    })
  })
})
