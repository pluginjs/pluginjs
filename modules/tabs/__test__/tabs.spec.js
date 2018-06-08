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
    test('should have Tabs', () => {
      expect(Tabs).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tabs.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tabs.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tabs.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tabs.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const tabs = new Tabs(element)

      expect(tabs).toBeObject()
      expect(tabs.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const tabs = new Tabs(element)

      expect(tabs.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const $element = $(element)

      expect($element.asTabs()).toEqual($element)

      const api = $element.data('tabs')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const $element = $(element).asTabs()
      expect($element.asTabs('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      const $element = $(element).asTabs()
      expect($element.asTabs('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      const element = document.createElement('div')
      element.innerHTML = testStr
      $element = $(element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('tabs:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asTabs()
      expect(called).toEqual(1)
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

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('tabs:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asTabs('destroy')

      expect(called).toEqual(1)
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

    test('should enable the plugin', () => {
      $element.asTabs('disable')
      $element.asTabs('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('tabs:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asTabs('enable')
      expect(called).toEqual(1)
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

    test('should disable the plugin', () => {
      $element.asTabs('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('tabs:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asTabs('disable')
      expect(called).toEqual(1)
    })
  })
})
