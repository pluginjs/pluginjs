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
    it('should have Slider', () => {
      expect(Slider).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Slider.defaults).to.be.an('object')
    })
    it('should have events', () => {
      expect(Slider.events).to.be.an('object')
    })
    it('should have classes', () => {
      expect(Slider.classes).to.be.an('object')
    })
    it('should have methods', () => {
      expect(Slider.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const slider = new Slider(element)

      expect(slider).to.be.an('object')
      expect(slider.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const slider = new Slider(element)

      expect(slider.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element)

      expect($element.asSlider()).to.be.equal($element)

      const api = $element.data('slider')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element).asSlider()
      expect($element.asSlider('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      document.body.appendChild(element)
      const $element = $(element).asSlider()
      $element.asSlider('destroy')
      // expect().to.be.equal($element);
      // expect($element).to.be.equal($element);
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

      $element.on('slider:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asSlider()
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
      $element = $(element).asSlider()
      api = $element.data('slider')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('slider:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asSlider('destroy')

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
      $element = $(element).asSlider()
      api = $element.data('slider')
    })

    it('should enable the plugin', () => {
      $element.asSlider('disable')
      $element.asSlider('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('slider:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asSlider('enable')
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
      $element = $(element).asSlider()
      api = $element.data('slider')
    })

    it('should disable the plugin', () => {
      $element.asSlider('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('slider:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asSlider('disable')
      expect(called).to.be.equal(1)
    })
  })
})
