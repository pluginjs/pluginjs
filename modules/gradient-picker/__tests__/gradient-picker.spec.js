import GradientPicker from '../src/main'
// import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = {
  'warm-flame':
    'linear-gradient(45deg, rgba(233,23,233,0.5) 0%, rgba(23,23,233,0.6) 99%, #fad0c4 100%)',
  'night-fade': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'spring-warnth':
    'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)',
  'juicy-peach': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'young-passion':
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'lady-lips': 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'sunny-morning': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'rainy-ashville': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
}
GradientPicker.setData(data)
describe('GradientPicker', () => {
  describe('GradientPicker()', () => {
    test('should have GradientPicker', () => {
      expect(GradientPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GradientPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(GradientPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(GradientPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(GradientPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const gradientPicker = GradientPicker.of(generateHTMLSample(), { data })

      expect(gradientPicker).toBeObject()
      // expect(gradientPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const gradientPicker = GradientPicker.of(generateHTMLSample(), { data })

      expect(gradientPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = GradientPicker.of($element, { data })

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = GradientPicker.of(generateHTMLSample(), { data })
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = GradientPicker.of(generateHTMLSample(), { data })
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:ready', () => {
        called++
      })

      const api = GradientPicker.of($element, { data })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientPicker.of($element, { data })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientPicker.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:enable', () => {
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
      api = GradientPicker.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
