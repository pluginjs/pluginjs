import jsdom from 'mocha-jsdom'
import $ from 'jquery'
import Tabs from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const testStr = `<ul>
<li>tab1</li>
<li>tab2</li>
<li>tab3</li>
</ul>
<div>
<div>Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</div>
<div>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor.Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem.Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor.Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem.Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor.Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem.
</div>
<div>Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum eratVestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum eratVestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum eratVestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
</div>
</div>`
describe('Tabs', () => {
  describe('Tabs()', () => {
    it('should have Tabs', () => {
      expect(Tabs).to.be.an('function')
    })

    it('should have defaults', () => {
      expect(Tabs.defaults).to.be.an('object')
    })

    it('should have events', () => {
      expect(Tabs.events).to.be.an('object')
    })

    it('should have classes', () => {
      expect(Tabs.classes).to.be.an('object')
    })

    it('should have methods', () => {
      expect(Tabs.methods).to.be.an('array')
    })
  })

  describe('constructor()', () => {
    it('should work with element', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const tabs = new Tabs(element)

      expect(tabs).to.be.an('object')
      expect(tabs.options).to.be.eql(DEFAULTS)
    })

    it('should have options', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const tabs = new Tabs(element)

      expect(tabs.options).to.be.an('object')
    })
  })

  describe('jquery constructor', () => {
    it('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const $element = $(element)

      expect($element.asTabs()).to.be.equal($element)

      const api = $element.data('tabs')

      expect(api).to.be.an('object')
      expect(api.options).to.be.an('object')
    })
  })

  describe('api call', () => {
    it('should not call bind', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const $element = $(element).asTabs()
      expect($element.asTabs('bind')).to.be.undefined
    })

    it('should call destroy', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const $element = $(element).asTabs()
      expect($element.asTabs('destroy')).to.be.equal($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      $element = $(element)
    })

    it('should trigger ready event', () => {
      let called = 0

      $element.on('tabs:ready', (event, api) => {
        expect(api.is('initialized')).to.be.true
        called++
      })

      $element.asTabs()
      expect(called).to.be.equal(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      $element = $(element).asTabs()
      api = $element.data('tabs')
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.on('tabs:destroy', (event, api) => {
        expect(api.is('initialized')).to.be.false
        called++
      })

      $element.asTabs('destroy')

      expect(called).to.be.equal(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      $element = $(element).asTabs()
      api = $element.data('tabs')
    })

    it('should enable the plugin', () => {
      $element.asTabs('disable')
      $element.asTabs('enable')

      expect(api.is('disabled')).to.be.false
    })

    it('should trigger enable event', () => {
      let called = 0

      $element.on('tabs:enable', (event, api) => {
        expect(api.is('disabled')).to.be.false
        called++
      })

      $element.asTabs('enable')
      expect(called).to.be.equal(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      $element = $(element).asTabs()
      api = $element.data('tabs')
    })

    it('should disable the plugin', () => {
      $element.asTabs('disable')

      expect(api.is('disabled')).to.be.true
    })

    it('should trigger disable event', () => {
      let called = 0

      $element.on('tabs:disable', (event, api) => {
        expect(api.is('disabled')).to.be.true
        called++
      })

      $element.asTabs('disable')
      expect(called).to.be.equal(1)
    })
  })
})
