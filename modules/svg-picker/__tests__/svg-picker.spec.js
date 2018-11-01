import SvgPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value =
  '{"name":"chrome","svg":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" class=\\"feather feather-chrome\\"><circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"></circle><circle cx=\\"12\\" cy=\\"12\\" r=\\"4\\"></circle><line x1=\\"21.17\\" y1=\\"8\\" x2=\\"12\\" y2=\\"8\\"></line><line x1=\\"3.95\\" y1=\\"6.06\\" x2=\\"8.54\\" y2=\\"14\\"></line><line x1=\\"10.88\\" y1=\\"21.94\\" x2=\\"15.46\\" y2=\\"14\\"></line></svg>"}'
const data = {
  name: 'chrome',
  svg:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chrome"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>'
}

describe('SvgPicker', () => {
  describe('SvgPicker()', () => {
    test('should have SvgPicker', () => {
      expect(SvgPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SvgPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(SvgPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(SvgPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(SvgPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const api = SvgPicker.of(generateHTMLSample())

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })

    test('should have options', () => {
      const api = SvgPicker.of(generateHTMLSample())

      expect(api.options).toBeObject()
      expect(api.options).toEqual(DEFAULTS)
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = SvgPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('svgPicker:ready', () => {
        called++
      })

      const api = SvgPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('svgPicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(value)
      api = SvgPicker.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = SvgPicker.of($element, {
        onChange(value) {
          called = true
          expect(value).toBe(value)
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = SvgPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe(value)
        }
      })

      api.set(data)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeNil()
    })
    it('should get the value with value', () => {
      $element = generateHTMLSample(value)
      api = SvgPicker.of($element)

      expect(api.get()).toBeObject(data)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeNil()

      api.set(data)
      expect(api.get()).toEqual(data)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(value)

      expect(api.get()).toEqual(data)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('svgPicker:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('svgPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
